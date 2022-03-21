const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require("session-file-store")(session);
const flash = require('express-flash')

const db = require('./db/conn')

const toughtsRoutes = require('./routes/toughtsRoutes')
const usersRoutes = require('./routes/usersRoutes')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
    name: 'session',
    secret: '21f59cf9c7b3b2290826e2c57db9e93d849720a8', // Variável de ambiente, não use no repositório
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function () { },
        path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
        secure: false,
        maxAge: 3600000,
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
    }
}))
app.use(flash())
// Permite acesso das variaveis do session na response
app.use((req, res, next) => {
    if (req.session.user) {
        res.locals.session = req.session
    }

    next()
})

app.use('/tought', toughtsRoutes)
app.use('/', usersRoutes)

db.sync()
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'))
    })
    .catch(err => console.log(err))