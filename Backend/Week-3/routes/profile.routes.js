const express = require("express");

const router = express.Router();

const authJwt = require("../middlewares/authJwt");


router.get("/profile", authJwt, (req,res)=>{


    res.json({

        message:"Profile accessed",

        user:req.user

    });


});


module.exports = router;