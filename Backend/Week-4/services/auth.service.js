const { User } = require("../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");


// Signup Service

exports.signup = async (userData) => {

    const { name, email, password } = userData;


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({

        name,

        email,

        password: hashedPassword,

        role: "user",

    });


    return user;

};



// Login Service

exports.login = async (email, password) => {


    const user = await User.findOne({

        where:{
            email
        }

    });


  if(!user){

throw new AppError(
"User not found",
404
);

}



    const isPasswordValid =
    await bcrypt.compare(password,user.password);



    if(!isPasswordValid){

throw new AppError(
"Invalid password",
401
);

}



    const token = jwt.sign(

        {
            id:user.id,
            email:user.email,
            role:user.role
        },


        "secretkey",


        {
            expiresIn:"1d"
        }

    );


    return token;


};