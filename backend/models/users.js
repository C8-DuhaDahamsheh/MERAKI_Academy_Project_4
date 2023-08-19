const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: { type: String },
  lname: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role : {type :mongoose.Schema.Types.ObjectId ,ref :"Role" ,required:true}
});

module.exports = mongoose.model("User", userSchema);
