const express = require('express')

const routerProdutos = express.Router()

const produtos = [ { id: 1, descricao: "Teclado Mecânico", preco: 249.90, categoria: "Periféricos", estoque: 15} 
]

routerProdutos.get('/', (requisitar, resposta) => {
    resposta.json(produtos)
})

routerProdutos.get('/:id', (requisitar, resposta) => {
    const id = parseInt(requisitar.params.id)
    const index = produtos.findIndex(produto => produto.id === id)

    if (index != -1) {
        resposta.json(produtos[index])
    } else {
        resposta.status = 404
        resposta.send("Produto não encontrado")
    }
})

routerProdutos.post('/', (requisitar, resposta) => {
    requisitar.body.id = produtos.length + 1;
    produtos.push(requisitar.body);
    resposta.status(201).json(requisitar.body);
})

routerProdutos.put('/:id', (requisitar, resposta) => {
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

routerProdutos.delete('/:id', (requisitar, resposta) => {
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

 module.exports = routerProdutos