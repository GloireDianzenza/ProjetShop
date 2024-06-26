const linkEnsembleProduits = "http://localhost:3000/api/products/";

let jsonProduits;

fetch(linkEnsembleProduits).then(response=>response.json()).then((data)=>{
    jsonProduits = data;
    jsonProduits = jsonProduits.filter((product)=>localStorage.getItem(product._id) !== null);
    console.log(jsonProduits);
}).catch((error)=>{
    console.error("error",error);
    jsonProduits = [];
    console.log(jsonProduits);
});