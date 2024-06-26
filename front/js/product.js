const link = new URL(window.location.href);
const searchParam = new URLSearchParams(link.search);
const id = searchParam.get("id");
if(!searchParam.has("id"))window.location = window.location.origin+"/front/html";

const linkEnsembleProduits = "http://localhost:3000/api/products/";

let jsonProduits,currentProduct;

fetch(linkEnsembleProduits).then(response=>response.json()).then((data)=>{
    jsonProduits = data;
    let prods = jsonProduits.filter((product)=>product._id == id);
    if(prods.length <= 0)window.location = window.location.origin+"/front/html";
    currentProduct = prods[0];
    console.log(currentProduct);
}).catch((error)=>{
    console.error("error",error);
    jsonProduits = [];
    currentProduct = null;
    console.log(jsonProduits);
});