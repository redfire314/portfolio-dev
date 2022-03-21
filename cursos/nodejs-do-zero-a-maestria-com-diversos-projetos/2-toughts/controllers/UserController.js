const User = require('../models/User')
const bcryptjs = require('bcryptjs')

class UserController {
    /* POST */
    static async login(req, res) {
        // Recuperar dados
        const { email, password } = req.body

        // Validar dados
        if (!email || !password) {
            req.flash('message', 'Preencha todos os campos')
            req.session.save(() => {
                res.redirect('/login')
            })
            return
        }

        // Validar usuário
        const user = await User.findOne({
            where: {
                email: email
            },
            raw: true
        })

        if (!user) {
            req.flash('message', 'Usuário e/ou senha inválido')
            req.session.save(() => {
                res.redirect('/login')
            })
            return
        }

        const crypPass = bcryptjs.compareSync(password, user.password)
        if (!crypPass) {
            req.flash('message', 'Usuário e/ou senha inválido')
            req.session.save(() => {
                res.redirect('/login')
            })
            return
        }

        // Salvar sessão
        req.session.user = user
        req.flash('message', 'Usuário logado com sucesso')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static async signUp(req, res) {
        // Recuperar dados
        const { name, email, password, password2 } = req.body

        // Validar dados
        if (!name || !email || !password || !password2) {
            req.flash('message', 'Preencha todos os campos')
            req.session.save(() => {
                res.redirect('/signup')
            })
            return
        }

        if (password != password2) {
            req.flash('message', 'As senhas devem ser iguais')
            req.session.save(() => {
                res.redirect('/signup')
            })
            return
        }

        // Validar usuário
        const user = await User.findOne({
            where: {
                email: email
            },
            raw: true
        })

        if (user) {
            req.flash('message', 'Usuário já cadastrado')
            req.session.save(() => {
                res.redirect('/signup')
            })
            return
        }

        // Criando usuário
        const salt = bcryptjs.genSaltSync()
        const crypPass = bcryptjs.hashSync(password, salt)
        const data = {
            name,
            email,
            password: crypPass
        }

        const newUser = await User.create(data, { raw: true })

        // Salvando sessão
        req.session.user = newUser.dataValues
        req.flash('message', 'Usuário cadastrado com sucesso')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    /* GET */
    static loginRender(req, res) {
        res.render('user/login')
    }

    static signUpRender(req, res) {
        res.render('user/signup')
    }

    static async logout(req, res) {
        await req.session.destroy()
        res.redirect('/')
    }
}

module.exports = UserController