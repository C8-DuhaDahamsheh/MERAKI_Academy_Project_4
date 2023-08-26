const express = require("express")

const {addProduct ,getByCategoryId ,getProductById ,getProductByName} = require("../controllers/product")

const productRouter = express.Router()

productRouter.post("/" , addProduct)
productRouter.get("/:id/category" ,getByCategoryId)
productRouter.get("/:id" ,getProductById)
productRouter.get("" , getProductByName)

module.exports = productRouter