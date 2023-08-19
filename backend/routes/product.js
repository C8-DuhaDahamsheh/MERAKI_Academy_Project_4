const express = require("express")

const {addProduct ,getByCategoryId} = require("../controllers/product")

const productRouter = express.Router()

productRouter.post("/" , addProduct)
productRouter.get("/:id/category" ,getByCategoryId)



module.exports = productRouter