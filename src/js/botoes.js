let btnTodosProdutos = document.getElementById("1")
let btnHortifruti    = document.getElementById("2")
let btnPanificadora  = document.getElementById("3")
let btnLaticinios    = document.getElementById("4")

btnTodosProdutos.addEventListener("click", function(){
    ulProdutos.innerHTML = ""
    listarProdutos(produtos, ulProdutos)
    //calcularTotal(produtos)
})

btnHortifruti.addEventListener("click", function(){
    let arrHortifruti = []

    for(let i = 0; i < produtos.length; i++){
        if(produtos[i].secao.includes("Hortifruti")){
            arrHortifruti.push(produtos[i])
        }
    }

    ulProdutos.innerHTML = ""
    listarProdutos(arrHortifruti, ulProdutos)
    //calcularTotal(arrHortifruti)
})

btnPanificadora.addEventListener("click", function(){
    let arrPanificadora = []

    for(let i = 0; i < produtos.length; i++){
        if(produtos[i].secao.includes("Panificadora")){
            arrPanificadora.push(produtos[i])
        }
    }

    ulProdutos.innerHTML = ""
    listarProdutos(arrPanificadora, ulProdutos)
    //calcularTotal(arrPanificadora)
})

btnLaticinios.addEventListener("click", function(){
    let arrLaticinios = []

    for(let i = 0; i < produtos.length; i++){
        if(produtos[i].secao.includes("Laticinio")){
            arrLaticinios.push(produtos[i])
        }
    }

    ulProdutos.innerHTML = ""
    listarProdutos(arrLaticinios, ulProdutos)
    //calcularTotal(arrLaticinios)
})