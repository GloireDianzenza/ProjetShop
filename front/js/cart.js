const linkEnsembleProduits = "http://localhost:3000/api/products/";

let jsonProduits;

fetch(linkEnsembleProduits).then(response=>response.json()).then((data)=>{
    jsonProduits = data;



    let cartItems = document.getElementById("cart__items");
    console.log(cartItems);
    let array = JSON.parse(localStorage.getItem("array"));
    let index = 0;
    for(let item of array){
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.setAttribute("data-id",item.id);
        article.setAttribute("data-color",item.color);
        let product = getProductFromID(jsonProduits,item.id);

        let imageDiv = document.createElement("div");
        let contentDiv = document.createElement("div");
        contentDiv.classList.add("cart__item__content");

        let image = document.createElement("img");
        image.alt = product.altTxt;
        image.src = product.imageUrl;
        imageDiv.appendChild(image);
        imageDiv.classList.add("cart__item__img");
        article.appendChild(imageDiv);
        article.appendChild(contentDiv);

        let contentDesc = document.createElement("div");
        let contentSettings = document.createElement("div");
        contentDesc.classList.add("cart__item__content__description");
        contentSettings.classList.add("cart__item__content__settings");

        let settingsQuantity = document.createElement("div");
        let settingsDelete = document.createElement("div");
        settingsQuantity.classList.add("cart__item__content__settings__quantity");
        settingsDelete.classList.add("cart__item__content__settings__delete");

        let quantityDiv = document.createElement("p");
        let numberInput = document.createElement("input");
        numberInput.type = "number";
        numberInput.classList.add("itemQuantity");
        numberInput.name = "itemQuantity";
        numberInput.min = "1"
        numberInput.max = "100";
        numberInput.value = item.quantity.toString();

        numberInput.addEventListener("change",()=>{
            let value = numberInput.value;
            let currentArticle = numberInput.closest("article");
            let id = currentArticle.getAttribute("data-id");
            let color = currentArticle.getAttribute("data-color");
            let array = JSON.parse(localStorage.getItem("array"));
            let test = array.filter((item)=>item.id == id && item.color == color);
            test[0].quantity = value;
            let index = array.indexOf(test[0]);
            array[index] = test[0];
            localStorage.setItem("array",JSON.stringify(array));
        })

        quantityDiv.innerHTML = "Quantité: ";

        let deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        deleteItem.innerHTML = "Supprimer";
        deleteItem.addEventListener("click",()=>{
            let currentArticle = deleteItem.closest("article");
            let id = currentArticle.getAttribute("data-id");
            let color = currentArticle.getAttribute("data-color");
            let array = JSON.parse(localStorage.getItem("array"));
            let test = array.filter((item)=>item.id == id && item.color == color);
            let index = array.indexOf(test[0]);
            array.splice(index,1);
            localStorage.setItem("array",JSON.stringify(array));
            currentArticle.remove();
        })

        settingsDelete.appendChild(deleteItem);
        settingsQuantity.appendChild(quantityDiv);
        settingsQuantity.appendChild(numberInput);
        contentSettings.appendChild(settingsQuantity);
        contentSettings.appendChild(settingsDelete);

        let productName = document.createElement("h2");
        let productColor = document.createElement("p");
        let productPrice = document.createElement("p");
        productName.innerHTML = product.name;
        productColor.innerHTML = item.color;
        product.price = product.price.toString();
        if(product.price.length % 2 == 0){
            let index1 = product.price.length / 2;
            product.price = product.price.slice(0,index1)+","+product.price.slice(index1);
        }
        else{
            let index1 = parseInt(product.price.length / 2) + 1;
            product.price = product.price.slice(0,index1)+","+product.price.slice(index1);
        }
        productPrice.innerHTML = product.price+" €";
        contentDesc.appendChild(productName);
        contentDesc.appendChild(productColor);
        contentDesc.appendChild(productPrice);

        contentDiv.appendChild(contentDesc);
        contentDiv.appendChild(contentSettings);

        cartItems.appendChild(article);
        index++;
    }

}).catch((error)=>{
    console.error("error",error);
    jsonProduits = [];
    console.log(jsonProduits);
});

console.log(localStorage);

/**
 * 
 * @param {Object[]} products 
 * @param {string} id 
 * @returns {Object}
 */
function getProductFromID(products,id){
    for(let item of products){
        if(item._id == id)return item;
    }
    return {};
}

setInterval(()=>{
    document.querySelectorAll("input[type=number]").forEach(inp=>{
        if(inp.value == "")inp.value = "1";
    });
},100);

/**
 * 
 */
order.addEventListener("click",(event)=>{
    event.preventDefault();
    if(firstName.value.trim()==="")return;
    else if(lastName.value.trim()==="")return;
    else if(address.value.trim()==="")return;
    else if(city.value.trim()==="")return;
    else if(email.value.trim()=="")return;
    else if(!email.value.includes("@") || email.value.split("@").length != 2 || email.value.split("@")[1] == "" || validateEmail(email.value) == null){
        emailErrorMsg.innerHTML = "Incorrect email format !";
        return;
    }
    console.log();
    emailErrorMsg.innerHTML = "";
    let fn = firstName.value;
    let ln = lastName.value;
    let add = address.value;
    let town = city.value;
    let mail = email.value;

    let contact = {
        firstName:fn,
        lastName:ln,
        address:add,
        city:town,
        email:mail
    }

    let array = JSON.parse(localStorage.getItem("array"));
    let arrayProducts = array.map((item)=>item.id);

    let customerOrder = {contact:contact,products:arrayProducts};
    console.log(customerOrder);

    fetch("http://localhost:3000/api/products/order",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(customerOrder)
    }).then(response=>response.json()).then(data=>{
        let customOrder = data;
        console.log(customOrder);
        let orderID = customOrder.orderId;
    }).catch(error=>{
        console.error("error",error);
    })

})

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };