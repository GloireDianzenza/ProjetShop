const link = new URL(window.location.href);
const searchParam = link.searchParams;
const id = searchParam.get("id");
if(id == null)window.location = window.location.origin+"/front/html";

const linkEnsembleProduits = "http://localhost:3000/api/products/";

let jsonProduits,currentProduct;

fetch(linkEnsembleProduits).then(response=>response.json()).then((data)=>{
    jsonProduits = data;
    let prods = jsonProduits.filter((product)=>product._id == id);
    currentProduct = prods[0];
}).catch((error)=>{
    console.error("error",error);
    jsonProduits = [];
    console.log(jsonProduits);
});