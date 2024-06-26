const linkEnsembleProduits = "http://localhost:3000/api/products/";

let jsonProduits;

fetch(linkEnsembleProduits).then(response=>response.json()).then((data)=>{
    jsonProduits = data;
    console.log(jsonProduits);
}).catch((error)=>{
    console.error("error",error);
    jsonProduits = [];
    console.log(jsonProduits);
});