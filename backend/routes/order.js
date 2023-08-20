const express = require("express");

const {
  creatOrder,
  getOrderById,
  updatOrderById,
  deleteOrderById,
} = require("../controllers/order");
const order = require("../models/order");

const orderRouter = express.Router()

orderRouter.post("/" , creatOrder)
orderRouter.get("/:id" , getOrderById)
orderRouter.put("/:id" , updatOrderById)
orderRouter.delete ("/:id" , deleteOrderById)


module.exports = orderRouter