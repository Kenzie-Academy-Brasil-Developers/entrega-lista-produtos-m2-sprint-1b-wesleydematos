let ulProdutos = document.querySelector("ul")

function listarProdutos(arrayDeProdutos){

    for(let i = 0; i<arrayDeProdutos.length; i++){
        let produto             = arrayDeProdutos[i]
        let cardProduto         = criarCardProduto(produto)

        ulProdutos.appendChild(cardProduto)
    }
}
listarProdutos(produtos)
calcularTotal(produtos)

function criarCardProduto(produto){
    let tagLi   = document.createElement("li")
    let tagImg  = document.createElement("img")
    let tagH3   = document.createElement("h3")
    let tagSpan = document.createElement("span")
    let tagP    = document.createElement("p")

    tagImg.src        = produto.img
    tagImg.alt        = `Imagem ${produto.nome}`
    tagH3.innerText   = produto.nome
    tagSpan.innerText = produto.secao
    tagP.innerText    = `R$ ${produto.preco}.00`

    tagLi.append(tagImg, tagH3, tagSpan, tagP)

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