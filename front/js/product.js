const link = new URL(window.location.href);
const searchParam = new URLSearchParams(link.search);
const id = searchParam.get("id");
if(!searchParam.has("id"))window.location = window.location.origin+"/front/html";

const linkProduit = "http://localhost:3000/api/products/"+id;

let currentProduct;

fetch(linkProduit).then(response=>response.json()).then((data)=>{
    currentProduct = data;
    console.log(currentProduct);
}).catch((error)=>{
    console.error("error",error);
    currentProduct = null;
    console.log(currentProduct);
});