const express = require('express')
const ToughtController = require('../controllers/ToughtController')

const route = express.Router()

// Rota protegia /tought/*
route.use((req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login')
        return
    }

    next()
})

route.post('/remove', ToughtController.removeTought)
route.post('/edit', ToughtController.editTought)
route.post('/create', ToughtController.createTought)

route.get('/edit/:id', ToughtController.editToughtRender)
route.get('/create', ToughtController.createToughtRender)
route.get('/dashboard', ToughtController.dashboardRender)

module.exports = route