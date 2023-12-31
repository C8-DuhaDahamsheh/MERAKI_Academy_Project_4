const mongoose =require("mongoose")

const orderSchema= new mongoose.Schema({
    user :{type : mongoose.Schema.Types.ObjectId , ref:"User"},
    card:[{type :mongoose.Schema.Types.ObjectId , ref:"Card"}],
    phoneNumber : {type:String},
    address :{type:String},
    chekedOut : {type:String}
})

module.exports = mongoose.model("Order" ,orderSchema)