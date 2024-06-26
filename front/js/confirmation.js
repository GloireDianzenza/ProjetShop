let numbers = '0123456789';
let orderNumber = "";
for(let i = 0;i < 17;i++){
    let index = Math.floor(Math.random()*numbers.length);
    let num = numbers[index];
    orderNumber += num;
}