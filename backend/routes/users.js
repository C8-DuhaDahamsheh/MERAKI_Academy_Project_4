const express = require("express")

const {register , login} = require("../controllers/users")

const userRouter = express.Router()

userRouter.post("/login" , login)
userRouter.post("/register" ,register)


module.exports = userRouter