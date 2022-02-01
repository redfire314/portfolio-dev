const express = require('express')
const UserController = require('../controllers/UserController')
const ToughtController = require('../controllers/ToughtController')

const route = express.Router()

route.post('/signup', UserController.signUp)
route.post('/login', UserController.login)

route.get('/logout', UserController.logout)
route.get('/signup', UserController.signUpRender)
route.get('/login', UserController.loginRender)
route.get('/', ToughtController.toughtsRender)

module.exports = route