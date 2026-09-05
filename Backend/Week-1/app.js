// const {getProductName,getProductPrice,getProductCollection}  = require("./product");

// const productName = getProductName();
// const productPrice = getProductPrice()
// const productCollection=getProductCollection()

// console.log(productName);
// console.log(productPrice);
// console.log(productCollection);

// First  Express Server
//This is for finding products dynamically
// const express = require("express");

// const app = express();


// const PORT = 3000;

// app.get("/", (req, res) => {
//     res.json({
//         message:"Backend is Running",
//         status:"success"
//     })
// });

// const products = [
//  {
//    id:1,
//    name:"Laptop",
//    price:800
//  },
//  {
//    id:2,
//    name:"Keyboard",
//    price:50
//  }
// ]

// app.get("/products/:id", (req, res) => { const productId = Number(req.params.id);

//     const product = products.find(
//         (item) => item.id === productId
//     );

//     if (!product) {
//     return res.status(404).json({
//         message: "Product not found"
//     });
// }
    
//     res.json(product);
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

//Day-2-3

// const express = require("express");

// const app = express();


// // Middleware: allows Express to read JSON data from request body
// app.use(express.json());


// const PORT = 3000;


// // ===============================
// // HOME ROUTE / SERVER CHECK
// // ===============================

// app.get("/", (req, res) => {
//     res.json({
//         message:"Backend is Running",
//         status:"success"
//     })
// });



// // ===============================
// // IN-MEMORY DATABASE
// // Temporary data (No MongoDB yet)
// // ===============================

// const products = [
//  {
//    id:1,
//    name:"Laptop",
//    price:800
//  },
//  {
//    id:2,
//    name:"Keyboard",
//    price:50
//  }
// ];



// // ===============================
// // READ ALL PRODUCTS
// // HTTP Method: GET
// // Endpoint: GET /products
// // Purpose: Return all products
// // ===============================

// app.get("/products", (req, res) => {
//     res.json(products);
// });




// // ===============================
// // READ SINGLE PRODUCT
// // HTTP Method: GET
// // Endpoint: GET /products/:id
// // Example: GET /products/1
// // req.params is used to get id from URL
// // ===============================

// app.get("/products/:id", (req, res) => {

//     const productId = Number(req.params.id);


//     const product = products.find(
//         (item) => item.id === productId
//     );


//     if (!product) {

//         return res.status(404).json({
//             message: "Product not found"
//         });

//     }


//     res.json(product);

// });




// // ===============================
// // CREATE PRODUCT
// // HTTP Method: POST
// // Endpoint: POST /products
// // req.body receives data from client
// // products.push() adds new product
// // Status Code: 201 Created
// // ===============================

// app.post("/products", (req, res) => {


//     const newProduct = req.body;


//     products.push(newProduct);


//     res.status(201).json({

//         message: "Product created successfully",

//         product: newProduct

//     });


// });




// // ===============================
// // UPDATE PRODUCT
// // HTTP Method: PUT
// // Endpoint: PUT /products/:id
// // Finds existing product and updates data
// // Uses:
// // req.params → id from URL
// // req.body   → new data
// // ===============================


// app.put("/products/:id", (req, res) => {


//     const productId = Number(req.params.id);


//     const product = products.find(
//         (item) => item.id === productId
//     );


//     if (!product) {

//         return res.status(404).json({
//             message:"Product not found"
//         });

//     }


//     product.name = req.body.name;

//     product.price = req.body.price;



//     res.json({

//         message:"Product updated successfully",

//         product

//     });


// });




// // ===============================
// // DELETE PRODUCT
// // HTTP Method: DELETE
// // Endpoint: DELETE /products/:id
// // findIndex() finds product position
// // splice() removes product
// // ===============================


// app.delete("/products/:id", (req, res) => {


//     const productId = Number(req.params.id);


//     const productIndex = products.findIndex(

//         (item)=> item.id === productId

//     );


//     if(productIndex === -1){

//         return res.status(404).json({

//             message:"Product not found"

//         });

//     }


//     const deletedProduct = products.splice(productIndex,1);



//     res.json({

//         message:"Product deleted successfully",

//         product:deletedProduct

//     });


// });




// // ===============================
// // START SERVER
// // ===============================

// app.listen(PORT, () => {

//     console.log(`Server running on port ${PORT}`);

// });


//Day-4-5
require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const app = express();


// Middleware
app.use(express.json());
app.use(morgan("dev"));


// Config
const config = require("./app/config/config");


// Routes
const productRoutes = require("./app/routes/product.routes");

app.use(productRoutes);


// Server
app.listen(config.port, () => {

    console.log(`Server running on port ${config.port}`);

});