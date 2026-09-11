const jwt = require('jsonwebtoken');
require('dotenv').config();

function VerificarLogin (req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.redirect('/login')
    }

    jwt.verify(token, process.env.JWT_SECRET, (erro, usuario) => {
        if (erro) {
            return res.redirect('/login')
        }

        req.usuario = usuario
        next()
    })
}

module.exports = VerificarLogin