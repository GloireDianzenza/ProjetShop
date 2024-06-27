const link = new URL(window.location.href);
const searchParam = new URLSearchParams(link.search);
const id = searchParam.get("orderID");
if(!searchParam.has("orderID"))window.location = window.location.origin+"/front/html";

console.log(id);

orderId.innerHTML = id;