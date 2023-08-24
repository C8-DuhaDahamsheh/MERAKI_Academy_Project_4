const mongoose =require("mongoose")


const cardSchema = new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId ,ref:"Product"},
    user : {type:mongoose.Schema.Types.ObjectId , ref :"User"} ,
    quantity: {type : Number},
    ordered :{type:String}

})

module.exports = mongoose.model("Card" , cardSchema)