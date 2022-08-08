let ulProdutos = document.querySelector("ul")

function listarProdutos(arrayDeProdutos, secao){

    if(arrayDeProdutos == undefined){
        ulProdutos.innerHTML = `<div class="novaBusca">Liste todos os produtos novamente e faça uma nova busca!</div>`
    }else{
        for(let i = 0; i<arrayDeProdutos.length; i++){
            let produto             = arrayDeProdutos[i]
            let cardProduto         = criarCardProduto(produto)
            let cardProdutoCarrinho = criarCardProdutoCarrinho(produto)

            if(secao == ulProdutos){
                secao.appendChild(cardProduto)
            }else{
                secao.appendChild(cardProdutoCarrinho)
            }
        }
    }
}
listarProdutos(produtos, ulProdutos)
//calcularTotal(produtos)

function criarCardProduto(produto){
    let tagLi       = document.createElement("li")
    let tagImg      = document.createElement("img")
    let tagH3       = document.createElement("h3")
    let tagPSecao     = document.createElement("p")
    let tagSpanComp = document.createElement("span")
    let tagDiv      = document.createElement("div")
    let tagP        = document.createElement("p")
    let tagButton   = document.createElement("button")

    let componentes = produto.componentes.join(", ")
    tagSpanComp.classList.add("componentes")
    tagSpanComp.innerHTML = `Componentes: ${componentes}.`
   
    tagImg.src              = produto.img
    tagImg.alt              = `Imagem ${produto.nome}`
    tagH3.innerText         = produto.nome
    tagPSecao.innerText       = produto.secao
    tagDiv.classList.add("preco--comprar")
    tagButton.innerHTML     = "Comprar"
    tagButton.id            = produto.id
    tagP.innerText          = `R$ ${produto.preco}`

    tagDiv.append(tagP, tagButton)
    tagLi.append(tagImg, tagH3, tagPSecao, tagSpanComp, tagDiv)

    return tagLi
}

function calcularTotal(array){
    document.querySelector(".totalPreco").innerText = ""
    let total      = 0

    for(let i = 0; i < array.length; i++){
        let valor = array[i].preco
        total += valor
    }

    document.querySelector(".totalPreco").innerText = `R$ ${total}.00`
}

let inputBusca = document.querySelector(".containerBuscaPorNome input")
let btnBusca = document.querySelector(".containerBuscaPorNome button")

btnBusca.addEventListener("click", function(event){
    let btnBuscar  = event.target
    
    if(btnBuscar.tagName == "BUTTON"){
        let pesquisaUsuario = inputBusca.value
        let resultadoBusca  = busca(pesquisaUsuario)

        ulProdutos.innerHTML = ''
        if(resultadoBusca == undefined){
            inputBusca.value = ""
        }
        listarProdutos(resultadoBusca, ulProdutos)
        inputBusca.value = ""
    }
})

function busca(valorPesquisa){
    
    let resultBusca = []

    for(let i = 0; i < produtos.length; i++){
        
        let pesquisa    = valorPesquisa.toLowerCase()
        let nomeProduto = produtos[i].nome.toLowerCase()
        let secao       = produtos[i].secao.toLowerCase()
        let categoria   = produtos[i].categoria.toLocaleLowerCase()
        
        if(nomeProduto.includes(pesquisa) || categoria.includes(pesquisa) || secao.includes(pesquisa)){
            resultBusca.push(produtos[i])
        }
    }

    if(resultBusca.length > 0){
        //calcularTotal(resultBusca)
        return resultBusca
    } else{
        //document.querySelector(".totalPreco").innerText = `R$ 00.00`
        alert("Busca não encontrada!")
    }
}

let divCarrinho = document.querySelector(".conteudoCarrinho")
divCarrinho.innerHTML = `<img src="./src/img/sacola.png" alt="Sacola de compras" class="sacola">
<p class="sacolaVazia">Por enquanto não temos produtos no carrinho.</p>`

let quantidadeProduto = document.getElementById("quantProduto")
let precoTotal        = document.getElementById("totalProduto")

function criarCardProdutoCarrinho(produto){
    let divCompraCarrinho = document.createElement("div")
    let divEsquerda       = document.createElement("div")
    let divImagemCompra   = document.createElement("div")
    let imgProduto        = document.createElement("img")
    let divConteudoCompra = document.createElement("div")
    let h3NomeProduto     = document.createElement("h3")
    let spanSecao         = document.createElement("span")
    let pPreco            = document.createElement("p")
    let botaoLixeira      = document.createElement("button")

    divCompraCarrinho.classList.add("compraCarrinho")
    divEsquerda.classList.add("esquerda")
    divImagemCompra.classList.add("imagemCompra")
    imgProduto.src = produto.img
    imgProduto.alt = `Imagem ${produto.nome}`
    divConteudoCompra.classList.add("conteudoCompra")
    h3NomeProduto.innerText = produto.nome
    spanSecao.innerText     = produto.secao
    pPreco.innerText        = produto.preco
    botaoLixeira.id         = produto.index
    botaoLixeira.innerText  = "X"

    divImagemCompra.append(imgProduto)
    divConteudoCompra.append(h3NomeProduto, spanSecao, pPreco)
    divEsquerda.append(divImagemCompra, divConteudoCompra)
    divCompraCarrinho.append(divEsquerda, botaoLixeira)

    return divCompraCarrinho
}

ulProdutos.addEventListener("click", interceptandoProduto)

let carrinhoCompras = []

function interceptandoProduto(event){

    let btnComprar  = event.target
    
    if(btnComprar.tagName == "BUTTON"){
    
        let idProduto = btnComprar.id
        let produto   = produtos.find(function(produto){

            if(produto.id == idProduto){
                return produto
            }
            
        })
        adicionarCarrinho(produto)
        //calcularTotal(carrinhoCompras)
    }
}

function adicionarCarrinho(produto){
    divCarrinho.innerHTML = ""

    if(produto !== undefined){
        carrinhoCompras.push(produto)

        for(let i = 0; i < carrinhoCompras.length; i++){
            let indexArr = carrinhoCompras[i]
            indexArr.index = i
        }
        listarProdutos(carrinhoCompras, divCarrinho)
    }
 
}


function removerProduto(event){
    let btnRemover = event.target

    if(btnRemover.tagName == "BUTTON"){
        let index = btnRemover.id

        carrinhoCompras.splice(index, 1)
        carrinhoCompras.innerText = ""

        for(let i = 0; i < carrinhoCompras.length; i++){
            let produtos = carrinhoCompras[i]
            produtos.index = i
        }

        divCarrinho.innerHTML = ""
        listarProdutos(carrinhoCompras, divCarrinho)
        if (carrinhoCompras.length <= 0){
            divCarrinho.innerHTML = `<img src="./src/img/sacola.png" alt="Sacola de compras" class="sacola">
            <p class="sacolaVazia">Por enquanto não temos produtos no carrinho.</p>`
        }
        //calcularTotal(carrinhoCompras)
    }
}
divCarrinho.addEventListener("click", removerProduto)