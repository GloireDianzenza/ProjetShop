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
    window.location = window.location.origin+"/front/html";
});