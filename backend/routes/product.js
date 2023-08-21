const express = require("express")

const {addProduct ,getByCategoryId ,getProductById} = require("../controllers/product")

const productRouter = express.Router()

productRouter.post("/" , addProduct)
productRouter.get("/:id/category" ,getByCategoryId)
productRouter.get("/:id/product" ,getProductById)


module.exports = productRouter