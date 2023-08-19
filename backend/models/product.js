const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discreption: { type: String },
  price: { type: String },
  image: { type: String },
  size : [{type : String}],
  color : [{type:String}],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});

module.exports = mongoose.model("Product", productSchema);
