// const express = require("express");

// const router = express.Router();

// const authController = require("../controllers/authController");


// router.post("/signup", authController.signup);

// router.post("/login", authController.login);


// module.exports = router;

//
const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");


router.get("/test", (req,res)=>{
    res.json({
        message:"Auth routes working"
    });
});


router.post("/signup", authController.signup);

router.post("/login", authController.login);


module.exports = router;