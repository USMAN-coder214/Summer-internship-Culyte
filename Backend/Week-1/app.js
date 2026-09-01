const {getProductName,getProductPrice,getProductCollection}  = require("./product");

const productName = getProductName();
const productPrice = getProductPrice()
const productCollection=getProductCollection()

console.log(productName);
console.log(productPrice);
console.log(productCollection);

