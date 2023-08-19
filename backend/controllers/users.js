const userModel = require("../models/users")

const register =(req , res )=>{
    const {fname , lname , age , country , email , password} = req.body 

    const newUser = new userModel({fname , lname , age , country , email , password}) 

    newUser.save().then((result)=>{
        if(result){
           return res.status(201).json({success: true ,
                message: "Account Created Successfully",
                result}) 
        }
    else{
        console.log("error from result ");
    }
    }).catch((err)=>{
        console.log(err);
        res.status(409).json({success: false ,
            message: "The email already exists"})
    })
}


const login =(req ,res)=>{
    const {email , password}=req.body

    userModel.findOne({ $and: [{ email }, { password }] }).then((result)=>{
        if(result === null){
            res.status(401).json({success: false,
                message: "Invalid login credentials"})
        }
        else{
            
            res.status(200).json({success: true,
                message: "Valid login credentials"})
        }
    }).catch((err)=>{
        console.log(err);
     res.status(404).json("error from login")

    })
}

module.exports = {register , login}