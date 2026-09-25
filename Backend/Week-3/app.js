const express = require("express");

const app = express();

const authRoutes = require("./routes/auth.routes");

const profileRoutes = require("./routes/profile.routes");

const adminRoutes = require("./routes/admin.routes");
// middleware
const logger = require("./middlewares/logger");


// built-in middleware
app.use(express.json());


// custom middleware
app.use(logger);

//
app.use(authRoutes);


app.use(profileRoutes);

app.use(adminRoutes);


// test route
app.get("/", (req, res) => {

    res.send("Week 3 Backend Running");

});


app.listen(3000, () => {

    console.log("Server running on port 3000");

});