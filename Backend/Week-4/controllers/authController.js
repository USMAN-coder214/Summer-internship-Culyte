const authService = require("../services/auth.service");



// Signup Controller

exports.signup = async(req,res)=>{


try{


const user = await authService.signup(req.body);



res.status(201).json({

message:"User created successfully",

user:{
    id:user.id,
    name:user.name,
    email:user.email,
    role:user.role
}

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};




// Login Controller

exports.login = async(req,res)=>{


try{


const {email,password}=req.body;



const token =
await authService.login(email,password);



res.json({

message:"Login successful",

token

});


}
catch(error){


res.status(500).json({

message:error.message

});


}


};