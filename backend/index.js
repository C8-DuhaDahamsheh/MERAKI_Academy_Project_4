const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
require("dotenv").config();
require("./models/db")
const app = express();


const userRouter = require("./routes/users")
const productRouter = require("./routes/product")
const roleRouter = require ("./routes/role")
const categoryRouter =require("./routes/category")
const cardRouter =require("./routes/card")
const orderRouter=require("./routes/order")
const PORT = process.env.PORT || 5000;

console.log(process.env.DATABASE_URI);
app.use(cors());
app.use(express.json());

app.use("/users" , userRouter)
app.use("/product" ,productRouter)
app.use("/role" , roleRouter)
app.use("/category" ,categoryRouter)
app.use("/card" , cardRouter)
app.use("/order",orderRouter)
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));





app.listen(PORT, () => {
  // console.log("error")
  console.log(`Server listening at http://localhost:${PORT}`);
});
