const express = require("express");

const app = express();


// Middleware
app.use(express.json());

const productRoutes = require("./routes/product.routes");

app.use("/products", productRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("Week-2 Backend is running");
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});