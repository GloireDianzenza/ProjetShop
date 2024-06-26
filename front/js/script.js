const linkEnsembleProduits = "http://localhost:3000/api/products/";

let jsonProduits;
if(localStorage.getItem("array") == null || localStorage.getItem("array") == undefined)localStorage.setItem("array",JSON.stringify([]));

fetch(linkEnsembleProduits).then(response=>response.json()).then((data)=>{
    jsonProduits = data;
    console.log(jsonProduits);
    for(let produit of jsonProduits){
        console.log(produit);
        let productLink = document.createElement("a");
        productLink.href = "./product.html?id="+produit._id;

        let article = document.createElement("article");

        let image = document.createElement("img");
        image.alt = produit.altTxt+", "+produit.name;
        image.src = produit.imageUrl;
        article.appendChild(image);
        let productName = document.createElement("h3");
        productName.classList.add("productName");
        productName.innerHTML = produit.name;
        article.appendChild(productName);
        
        let productDesc = document.createElement("p");
        productDesc.classList.add("productDescription");
        productDesc.innerHTML = produit.description;
        article.appendChild(productDesc);

        productLink.appendChild(article);

        items.appendChild(productLink);
    }
}).catch((error)=>{
    console.error("error",error);
    jsonProduits = [];
    items.innerHTML = "";
});

