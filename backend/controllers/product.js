const { mongo, default: mongoose } = require("mongoose");
const productModel = require("../models/product");

const addProduct = (req, res) => {
  const { name, discreption, price, image } = req.body;

  const newProduct = new mongoose.Schema({name,
    discreption ,
    price,
    image})

    newProduct.save().then((result)=>{
        if(result){
           return res.status(201).json({success: true ,
                message: "Product Add Successfully",
                result})
        }
    }).catch((err)=>{
       res.status(409).json({success: false ,
        message: "Error  from Sarver",
        err})
    })
};



