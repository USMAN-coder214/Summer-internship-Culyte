const express = require("express"); // Import Express
const router = express.Router(); // Create a router

const productController = require("../controllers/productController"); // Import controller

// GET /products → get all products
router.get("/products", productController.getProducts);

module.exports = router; // Export router