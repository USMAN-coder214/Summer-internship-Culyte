require("dotenv").config();

const express = require("express");
const db = require("./models");

const app = express();


// Middleware
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth.routes");

const profileRoutes =
require("./routes/profile.routes");


app.use("/", profileRoutes);


app.use("/", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Week-4 Backend Server Running"
    });
});


// Database connection
const PORT = 3000;


db.sequelize.authenticate()
.then(()=>{

    console.log("Database connected successfully");

    const errorHandler =
require("./middlewares/errorHandler");


app.use(errorHandler);

    app.listen(PORT,()=>{

        console.log(`Server running on port ${PORT}`);

    });


})
.catch((error)=>{

    console.log("Database connection failed");
    console.log(error);

});