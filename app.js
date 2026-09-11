const express = require('express')
const app = express()
const cookie = require('cookie-parser')

app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({ extended: true }))

/* ------------------------------------------------------------ */

app.use((requisitar, resposta, next) => {
    console.log(new Date().toLocaleString(), requisitar.method, requisitar.path)
    next()
})

/* ------------------------------------------------------------ */

const VerificarLogin = require('./middlewares/authSite')

app.use('/site', VerificarLogin, express.static('site'))

/* ------------------------------------------------------------ */

const routerProdutos = require('./routers/routerProdutos');

app.use('/produtos', routerProdutos);

/* ------------------------------------------------------------ */

const redirectLogado = require('./middlewares/redirectLogado')

app.use('/login', redirectLogado, express.static('login'));

const routerLogin = require('./routers/routerLogin');

app.use('/login', routerLogin);

/* ------------------------------------------------------------ */

const port = 3000

app.listen (port, (e) => {
    console.log(`Servidor ouvindo em http://localhost:${port}`)
})