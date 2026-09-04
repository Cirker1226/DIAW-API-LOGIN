function carregarProdutos() {
    fetch('/produtos')
        .then(res => res.json())
        .then(data => {
            const tabela = document.getElementById("elementos");
            tabela.innerHTML = "";

            data.forEach(element => {
                tabela.innerHTML += `
                    <tr>
                        <td>${element.id}</td>
                        <td>${element.categoria}</td>
                        <td>${element.descricao}</td>
                        <td>${element.preco}</td>
                        <td>${element.estoque}</td>
                    </tr>
                `;
            });
        })
}

const botaoCarregar = document.getElementById("carregar");
botaoCarregar.addEventListener("click", carregarProdutos);

/* -------------------------------------------------------------- */

const botaoExcluir = document.getElementById("excluir");
botaoExcluir.addEventListener("click", () => {
    const id = prompt("Digite o ID do produto que deseja excluir:");

    fetch(`/produtos/${id}`, 
        { 
        method: "DELETE" 
    })
        .then(res => {
            alert("Produto excluído com sucesso!");
            carregarProdutos();
        })
});

/* -------------------------------------------------------------- */

const botaoCadastrar = document.getElementById("cadastrar");
botaoCadastrar.addEventListener("click", () => {
    const categoria = prompt("Digite a categoria do produto:");
    const descricao = prompt("Digite o nome do produto:");
    const preco = prompt("Digite o preço do produto:");
    const estoque = prompt("Digite a quantidade em estoque do produto:");

    fetch('/produtos', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },      
        body: JSON.stringify({
            categoria: categoria,
            descricao: descricao,
            preco: preco,
            estoque: estoque,
        })
    })  
        .then(res => {
            alert("Produto cadastrado com sucesso!");
            carregarProdutos();
        })
});

/* -------------------------------------------------------------- */

const botaoEditar = document.getElementById("editar");
botaoEditar.addEventListener("click", () => {
    const id = prompt("Digite o ID do produto que deseja editar:");
    const categoria = prompt("Digite a nova categoria do produto:");
    const descricao = prompt("Digite o novo nome do produto:");
    const preco = prompt("Digite o novo preço do produto:");
    const estoque = prompt("Digite a nova quantidade em estoque do produto:");

    fetch(`/produtos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            categoria: categoria,
            descricao: descricao,
            preco: preco,
            estoque: estoque
        })
    })
        .then(res => {
            alert("Produto editado com sucesso!");
            carregarProdutos();
        })
});q
