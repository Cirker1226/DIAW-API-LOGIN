const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* ------------------------------------------------------------ */

app.use((requisitar, resposta, next) => {
    console.log(new Date().toLocaleString(), requisitar.method, requisitar.path)
    next()
})

/* ------------------------------------------------------------ */

app.use('/site', express.static('site'))

const routerProdutos = require('./routers/routerProdutos');

app.use('/produtos', routerProdutos);

/* ------------------------------------------------------------ */

app.use('/login', express.static('login'));

const routerLogin = require('./routers/routerLogin');

app.use('/login', routerLogin);

/* ------------------------------------------------------------ */

const port = 3000

app.listen (port, (e) => {
    console.log(`Servidor ouvindo em http://localhost:${port}`)
})