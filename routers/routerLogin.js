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
    res.redirect(`/site?token=${token}`)
})

routerLogin.get('/protegida', authToken, (req, res) => {
    res.json( { message: "Voce acessou uma rota protegida"} )
})

function authToken(req, res, next) {
    const authHeader = req.headers['authorization']

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.JWT_SECRET, (erro, usuario) => {
        if (erro) return res.sendStatus(401)
        req.usuario = usuario
        next()
    })
}

module.exports = routerLogin
