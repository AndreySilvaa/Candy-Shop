var txtinput, inputvalue, cxitem, nameitem, filtro, ul, li
var body, nav2, bar, itens, nitens = 0
var xmodal, modalwindow, imgs, urls = []
const btns = document.getElementsByClassName("btn")
const btcompra = document.getElementById("compra")
const cart = document.getElementById("cart")
var carrinho = document.querySelectorAll(".iconcart")
var total = 0
const clearcart = document.getElementById("btclear")
const checkout = document.getElementById("btcheckout")


function pesquisa(){
    inputvalue = document.getElementById("pesquisainput")
    filtro = inputvalue.value.toUpperCase()

    for(var i=0; i < cxitem.length; i++){
        var name = nameitem[i].innerText
        if(name.toUpperCase().indexOf(filtro) > -1){
            cxitem[i].style.display = ""
        }else{
            cxitem[i].style.display = "none"
        }
    }
}

function inicia(){
    txtinput = document.getElementById("pesquisa").addEventListener("keyup", pesquisa)
    cxitem = document.getElementsByClassName("item")
    nameitem = document.getElementsByClassName("item-name")
    ul = document.getElementById("list-itens")
    li = ul.getElementsByTagName("li")
    xmodal = document.getElementById("close").addEventListener("click", close)
    modalwindow = document.getElementById("modal")

    for(var i=0; i < li.length; i++){
        li[i].addEventListener("click", function(event){
            var valor = event.target.innerText

            if(valor == "CAKES"){
                valor = "CAKE"
            }else if(valor == "CUPCAKES"){
                valor = "CUPCAKE"
            }else if(valor == "SWEETS"){
                valor = "SWEET"
            }else if(valor == "DOUGHNUTS"){
                valor = "DOUGNUT"
            }

            for(var i=0; i < cxitem.length; i++){

                var name = nameitem[i].innerText

                if(name.toUpperCase().indexOf(valor) > -1){
                    cxitem[i].style.display = "block"
                }else{
                    cxitem[i].style.display = "none"
                }
            }

            if(valor == "ALL"){
                for(var i=0; i < cxitem.length; i++){
                        cxitem[i].style.display = "block"
                    
                }
            }

        })
    }

    // Responsividade
    const bar = document.getElementById("barras")
    bar.addEventListener("click", displayMenu)
    const itens = document.getElementById("itens")

    console.log()
    function displayMenu(){
        itens.classList.toggle("show")
    }
}

window.addEventListener("load", inicia)

//MODAL WINDOW

imgs = document.getElementsByClassName("img")

for(let i=0; i < imgs.length; i++){
    urls[i] = imgs[i].src

    imgs[i].addEventListener("click", modal =>{
        modalwindow.style.display = "block"
        document.getElementById("imgmodal").style.backgroundImage = "url('"+urls[i]+"')"
        Array.from(btns).forEach(function(button){
            button.addEventListener("click", function(event){
                if(button.classList.contains("prev")){
                    if(i == 0){
                        i = imgs.length
                    }
                    i--
                    document.getElementById("imgmodal").style.backgroundImage = "url('"+urls[i]+"')"
                }
                if(button.classList.contains("afte")){
                    if(i == imgs.length-1){
                        i = -1
                    }
                    i++
                    document.getElementById("imgmodal").style.backgroundImage = "url('"+urls[i]+"')"
                }
            })
        })
    })
}

function close(){
    modalwindow.style.display = "none"
}


//Usamos o método Array.from para converter o objeto tipo array em um array antes de chamar o método forEach(). Isso ocorre porque o document.getElementsByClassName retorna um tipo de array que não é processado no método forEach()

// CARRINHO

btcompra.addEventListener("click", () =>{
    cart.style.display = "block"
    cart.classList.toggle("showcart")
})

function inserthtml(img, nameitem, valor){
    let divcontainer = document.getElementById("cartitens")

    divcontainer.insertAdjacentHTML("afterbegin", `<div class="itemcart"> <img src="${img}"><div class="nameitem"><p>${nameitem}</p><span>${valor}</span></div><a onclick="del(this)" href="#"><i class="fas fa-trash"></i></a></div>`)
}

Array.from(carrinho).forEach((el) =>{
    el.addEventListener("click", () =>{
        let item = el.parentElement.parentElement
        let img = item.querySelector(".img").src 
        let nameitem = item.querySelector(".item-name").textContent
        let valor = item.getElementsByTagName("span")[1].textContent
        inserthtml(img, nameitem, valor)
        valor = Number(valor.replace("$", ""))
        res(valor)

        function res(valor){
            total = total + valor
            let qtditens = document.querySelectorAll(".itemcart")
            document.querySelector("#compra > span").innerText = `${qtditens.length} Itens - $${total}`
            document.getElementById("total").innerText = `$${total}`
        }
    })
})

// DELETE ICON
function del(e){
    let valor = e.parentElement.getElementsByTagName("span")[0].textContent
    valor = -Number(valor.replace("$", ""))
    total = total + valor
    e.parentElement.remove()
    let qtditens = document.querySelectorAll(".itemcart")
    document.querySelector("#compra > span").innerText = `${qtditens.length} Itens - $${total}`
    document.getElementById("total").innerText = `$${total}`

}

// CLEAR CART E CHECKOUT
document.querySelectorAll(".cartbts").forEach((el) => {
    el.addEventListener("click", () =>{
        let itens = document.querySelectorAll(".itemcart")
        if(itens.length == 0){
            alert("Não há itens no carrinho.")
        }else{
            if(el.textContent == "CHECKOUT"){
                alert(`Compra de ${itens.length} itens efetuada no valor de $${total}`)
            }
            itens.forEach((el) => {el.remove()})
            document.querySelector("#compra > span").innerText = `0 Itens - $0`
            document.getElementById("total").innerText = `$0`
            total = 0
        }
    })
})