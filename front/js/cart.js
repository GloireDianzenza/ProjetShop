const linkEnsembleProduits = "http://localhost:3000/api/products/";

let jsonProduits;

fetch(linkEnsembleProduits).then(response=>response.json()).then((data)=>{
    jsonProduits = data;



    let cartItems = document.getElementById("cart__items");
    console.log(cartItems);
    let array = JSON.parse(localStorage.getItem("array"));
    let index = 0;
    for(let item of array){
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.setAttribute("data-id",item.id);
        article.setAttribute("data-color",item.color);
        let product = getProductFromID(jsonProduits,item.id);

        let imageDiv = document.createElement("div");
        let contentDiv = document.createElement("div");
        contentDiv.classList.add("cart__item__content");

        let image = document.createElement("img");
        image.alt = product.altTxt;
        image.src = product.imageUrl;
        imageDiv.appendChild(image);
        imageDiv.classList.add("cart__item__img");
        article.appendChild(imageDiv);
        article.appendChild(contentDiv);

        let contentDesc = document.createElement("div");
        contentDesc.classList.add("cart__item__content__description");

        let productName = document.createElement("h2");
        let productColor = document.createElement("p");
        let productPrice = document.createElement("p");
        productName.innerHTML = product.name;
        productColor.innerHTML = item.color;
        if(product.price.length % 2 == 0){
            let index1 = product.price.length / 2 - 1;
            product.price = product.price.slice(0,index1)+","+product.price.slice(index1);
        }
        productPrice.innerHTML = product.price+" €";
        contentDesc.appendChild(productName);
        contentDesc.appendChild(productColor);
        contentDesc.appendChild(productPrice);

        contentDiv.appendChild(contentDesc);

        cartItems.appendChild(article);
        index++;
    }

}).catch((error)=>{
    console.error("error",error);
    jsonProduits = [];
    console.log(jsonProduits);
});

console.log(localStorage);

/**
 * 
 * @param {Object[]} products 
 * @param {string} id 
 * @returns {Object}
 */
function getProductFromID(products,id){
    for(let item of products){
        if(item._id == id)return item;
    }
    return {};
}