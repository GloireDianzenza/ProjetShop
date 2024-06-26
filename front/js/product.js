const link = new URL(window.location.href);
const searchParam = new URLSearchParams(link.search);
const id = searchParam.get("id");
if(!searchParam.has("id"))window.location = window.location.origin+"/front/html";

const linkProduit = "http://localhost:3000/api/products/"+id;

let currentProduct;

fetch(linkProduit).then(response=>response.json()).then((data)=>{
    currentProduct = data;
    console.log(currentProduct);
    
    let imgDiv = document.createElement("img");
    imgDiv.alt = currentProduct.altTxt;
    imgDiv.src = currentProduct.imageUrl;
    document.querySelector(".item__img").appendChild(imgDiv);

    document.querySelector(".item__content__titlePrice #title").innerHTML = currentProduct.name;
    document.querySelector(".item__content__titlePrice #price").innerHTML = currentProduct.price;
    document.querySelector(".item__content__description #description").innerHTML = currentProduct.description;

    for(let color of currentProduct.colors){

        let option = document.createElement("option");
        option.value = color;
        option.innerHTML = color;

        colors.appendChild(option);
    }
}).catch((error)=>{
    console.error("error",error);
    currentProduct = null;
    window.location = window.location.origin+"/front/html/cart.html";
});

addToCart.addEventListener("click",()=>{
    let id = currentProduct._id;
    let color = colors.value;
    let num = quantity.value;
    if(color == "" || num == "" || num == 0)return;
    if(arrayContains({id:id,color:color,quantity:num}) !== -1){
        let index = arrayContains({id:id,color:color,quantity:num});
        let array = JSON.parse(localStorage.getItem("array"));
        let lastQuantity = array[index].quantity;
        lastQuantity = parseInt(lastQuantity);
        lastQuantity += parseInt(num);
        array[index].quantity = lastQuantity;
        localStorage.setItem("array",JSON.stringify(array));
    }
    else{
        let array = JSON.parse(localStorage.getItem("array"));
        array.push({id:id,color:color,quantity:num});
        localStorage.setItem("array",JSON.stringify(array));
        
    }
    window.location = window.location.origin+"/front/html/cart.html";
})

setInterval(()=>{
    if(quantity.value.trim() === "")quantity.value = "0";
},100)

/**
 * 
 * @param {Object} obj 
 * @returns {number}
 */
function arrayContains(obj){
    if(localStorage.getItem("array") == undefined)return false;
    let list = JSON.parse(localStorage.getItem("array"));
    let index = 0;
    for(let item of list){
        if(item.id == obj.id && item.color == obj.color)return index;
        index++;
    }
    return -1;
}