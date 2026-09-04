const express = require('express')
const app = express()

app.use(express.json())

app.use((requisitar, resposta, next) => {
    console.log(new Date().toLocaleString(), requisitar.method, requisitar.path)
    next()
})

app.use('/site', express.static('site'))

const produtos = [ { id: 1, descricao: "Teclado Mecânico", preco: 249.90, categoria: "Periféricos", estoque: 15} 
]

app.get('/produtos', (requisitar, resposta) => {
    resposta.json(produtos)
})

app.get('/produtos/:id', (requisitar, resposta) => {
    const id = parseInt(requisitar.params.id)
    const index = produtos.findIndex(produto => produto.id === id)

    if (index != -1) {
        resposta.json(produtos[index])
    } else {
        resposta.status = 404
        resposta.send("Produto não encontrado")
    }
})

app.post('/produtos', (requisitar, resposta) => {
    requisitar.body.id = produtos.length + 1;
    produtos.push(requisitar.body);
    resposta.status(201).json(requisitar.body);
})

app.put('/produtos/:id', (requisitar, resposta) => {
    const id = parseInt(requisitar.params.id);
    console.log(`${id} Atualizado!`);

    // Essa parte do PUT foi realizada com ajuda!

    const index = produtos.findIndex(produto => produto.id === id);
    if (index != -1) {
        produtos[index] = { ...produtos[index], ...requisitar.body, id };
        resposta.json(produtos[index]);
    } else {
        resposta.status(404).json({ erro: 'ID não Encontrado' });
    }
})

app.delete('/produtos/:id', (requisitar, resposta) => {
    const id = parseInt(requisitar.params.id);

    const index = produtos.findIndex(produto => produto.id === id)

    if (index != -1) {
        produtos.splice(index, 1)

        resposta.json(produtos)
    } else {
        resposta.status = 404
        resposta.send('Produto não encontrado')
    }
 })

const port = 3000

app.listen (port, (e) => {
    console.log(`Servidor ouvindo em http://localhost:${port}`)
})

/* ------------------------------------------------------------ */

app.use('/login', express.static('login'))

const usuarios = [ { username: "admin", password: "senha123"} ]

app.post('/login', (requisitar, resposta) => {
    const usuario = requisitar.query.username;
    const passowrd = requisitar.query.password;

    if (usuario === usuarios.username && password === usuarios.password) {
        resposta.redirect('/site')
    } else {
        resposta.send(alert("Usuario Incorreto"))
    }
});