const mongoose = require("mongoose");

// const url = process.env.DATABASE_URI
// mongoose.set("strictQuery",false)
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("DB Ready To Use");
  })
  .catch((err) => {
    console.log("hello");
    console.log(err);
  });