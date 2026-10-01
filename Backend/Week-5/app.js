const express = require("express"); // Import Express
const cors = require("cors"); // Import CORS

const app = express(); // Create Express application

const productRoutes = require("./routes/products.routes");
app.use("/", productRoutes);

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Allow server to read JSON request bodies

app.get("/", (req, res) => { // Create GET / route
    res.json({
        message: "Week-5 Backend Server Running"
    }); // Send JSON response
});

const PORT = 3000; // Server port

app.listen(PORT, () => { // Start the server
    console.log(`Server running on port ${PORT}`);
});