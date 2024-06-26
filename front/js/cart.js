const linkEnsembleProduits = "http://localhost:3000/api/products/";

let jsonProduits;

fetch(linkEnsembleProduits).then(response=>response.json()).then((data)=>{
    jsonProduits = data;
}).catch((error)=>{
    console.error("error",error);
    jsonProduits = [];
    console.log(jsonProduits);
});

console.log(localStorage);
let cartItems = document.getElementById("cart__items");
console.log(cartItems);
let array = JSON.parse(localStorage.getItem("array"));
let index = 0;
for(let item of array){
    let article = document.createElement("article");
    article.classList.add("cart__item");
    article.setAttribute("data-id",item.id);
    article.setAttribute("data-color",item.color);

    let imageDiv = document.createElement("div");

    let image = document.createElement("img");
    imageDiv.appendChild(image);
    imageDiv.classList.add("cart__item__img");
    article.appendChild(imageDiv);

    cartItems.appendChild(article);
    index++;
}