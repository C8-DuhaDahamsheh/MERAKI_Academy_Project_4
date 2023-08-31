const mongoose = require("mongoose");

const favoritSchema = new mongoose.Schema({
 product : {type:mongoose.Schema.Types.ObjectId ,ref:"Product"} ,
 user :{type : mongoose.Schema.Types.ObjectId , ref:"User"} ,
});

module.exports = mongoose.model("Favorit", favoritSchema);