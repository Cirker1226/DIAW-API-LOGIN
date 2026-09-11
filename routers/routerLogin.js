const express = require('express')
const jwt = require('jsonwebtoken');

require('dotenv').config();

const routerLogin = express.Router()

const usuarios = [ { id: 1, username: 'Matheus', password: 'matheus123'} ]

routerLogin.post('/', (req, res) => {
    const {username, password} = req.body
    const user = usuarios.find(usuario => usuario.username === username && usuario.password === password)

    if (!user) {
        return res.status(401).json({message: 'Credenciais Invalidas.'})
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000 // A duração maxima do cookie é de 1 hora
    })

    res.redirect('/site')
})

routerLogin.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/login')
})

module.exports = routerLogin
