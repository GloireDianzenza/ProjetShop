const linkEnsembleProduits = "http://localhost:3000/api/products/";

let jsonProduits;

fetch(linkEnsembleProduits).then(response=>response.json()).then((data)=>{
    console.log(data);
}).catch((error)=>{
    console.error(error);
    jsonProduits = [];
});

console.log(jsonProduits);