const jwt = require('jsonwebtoken');
require('dotenv').config();

function redirectLogado (req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return next();
    }

    jwt.verify(token, process.env.JWT_SECRET, (erro, usuario) => {
        if (erro) {
            return next();
        }   

        return res.redirect('/site');
    })
}

module.exports = redirectLogado