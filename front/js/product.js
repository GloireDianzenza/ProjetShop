const link = new URL(window.location.href);
const searchParam = link.searchParams;
const id = searchParam.get("id");
if(id == null)window.location = window.location.origin+"/front/html";