const { Op } = require('sequelize')
const Tought = require('../models/Tought')
const User = require('../models/User')

class ToughtController {
    /* POST */
    static async createTought(req, res) {
        const title = req.body.title

        if (!title) {
            req.flash('message', 'Preencha todos os campos')
            req.session.save(() => {
                res.redirect('/tought/create')
            })
            return
        }

        const data = {
            title,
            UserId: req.session.user.id
        }

        await Tought.create(data)

        req.flash('message', 'Pensamento criado com sucesso')
        req.session.save(() => {
            res.redirect('/tought/dashboard')
        })
    }

    static async editTought(req, res) {
        const { id, title } = req.body

        if (!id || !title) {
            req.flash('message', 'Preencha todos os campos')
            req.session.save(() => {
                res.redirect('/tought/dashboard')
            })
            return
        }

        await Tought.update({ id, title }, {
            where: {
                id: id,
                UserId: req.session.user.id
            }
        })

        req.flash('message', 'Pensamento modificado com sucesso')
        req.session.save(() => {
            res.redirect('/tought/dashboard')
        })
    }

    static async removeTought(req, res) {
        const id = req.body.id

        if (!id) {
            req.flash('message', 'Não foi possível remover o pensamento')
            req.session.save(() => {
                res.redirect('/tought/dashboard')
            })
            return
        }

        await Tought.destroy({
            where: {
                id: id,
                UserId: req.session.user.id
            }
        })

        req.flash('message', 'Pensamento removido com sucesso')
        req.session.save(() => {
            res.redirect('/tought/dashboard')
        })
    }

    /* GET */
    static async dashboardRender(req, res) {
        const toughts = await Tought.findAll({
            where: {
                UserId: req.session.user.id
            },
            raw: true
        })

        res.render('tought/dashboard', { toughts })
    }

    static createToughtRender(req, res) {
        res.render('tought/create')
    }

    static async editToughtRender(req, res) {
        const tought = await Tought.findOne({
            where: {
                id: req.params.id
            },
            raw: true
        })

        res.render('tought/edit', { tought })
    }

    static async toughtsRender(req, res) {
        let { order, search } = req.query

        order ??= 'DESC'
        search ??= ''

        const data = await Tought.findAll({
            include: User,
            where: {
                title: { [Op.like]: `%${search}%` }
            },
            order: [['id', order]]
        })

        const toughts = data.map(res => res.get({ plain: true }))
        res.render('tought/toughts', { toughts })
    }
}

module.exports = ToughtController