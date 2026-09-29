const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload");


router.post(
"/profile/image",
upload.single("image"),

(req,res)=>{


res.json({

message:"Image uploaded successfully",

file:req.file

});


});


module.exports = router;