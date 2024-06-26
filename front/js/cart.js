const linkEnsembleProduits = "http://localhost:3000/api/products/";

let jsonProduits;

fetch(linkEnsembleProduits).then(response=>response.json()).then((data)=>{
    jsonProduits = data;
    for(let produit of jsonProduits){
        let index = jsonProduits.indexOf(produit);
        let id = produit._id;
        if(localStorage.getItem(id) === null){
            jsonProduits.splice(index,1);
        }
    }
    console.log(jsonProduits);
}).catch((error)=>{
    console.error("error",error);
    jsonProduits = [];
    console.log(jsonProduits);
});