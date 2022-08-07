let ulProdutos = document.querySelector("ul")

function listarProdutos(arrayDeProdutos){

    if(arrayDeProdutos == undefined){
        ulProdutos.innerHTML = `<div class="novaBusca">Liste todos os produtos novamente e faça uma nova busca!</div>`
    }else{
        for(let i = 0; i<arrayDeProdutos.length; i++){
            let produto             = arrayDeProdutos[i]
            let cardProduto         = criarCardProduto(produto)
    
            ulProdutos.appendChild(cardProduto)
        }
    }
}
listarProdutos(produtos)
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
        listarProdutos(resultadoBusca)
        inputBusca.value = ""
    }
})

function busca(valorPesquisa){
    
    let resultBusca = []

    for(let i = 0; i < produtos.length; i++){
        
        let pesquisa    = valorPesquisa.toLowerCase()
        let nomeProduto = produtos[i].nome.toLowerCase()
        let categoria   = produtos[i].secao.toLowerCase()
        
        if(nomeProduto.includes(pesquisa) || categoria.includes(pesquisa)){
            resultBusca.push(produtos[i])
        }
    }

    if(resultBusca.length > 0){
        //calcularTotal(resultBusca)
        return resultBusca
    } 
    document.querySelector(".totalPreco").innerText = `R$ 00.00`
    alert("Busca não encontrada!")
}