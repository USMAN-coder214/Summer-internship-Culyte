const express = require("express");

const router = express.Router();


const authJwt = require("../middlewares/authJwt");

const verifyRole = require("../middlewares/verifyRole");


router.get(
    "/admin",
    authJwt,
    verifyRole("admin"),
    (req,res)=>{

        res.json({

            message:"Welcome Admin",

            user:req.user

        });

    }
);


module.exports = router;