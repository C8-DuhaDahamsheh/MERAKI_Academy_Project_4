const express = require("express");

const {
  creatOrder,
  getOrderById,
  updatOrderById,
  deleteOrderById,
  getAllOrder
} = require("../controllers/order");
const order = require("../models/order");

const orderRouter = express.Router()

orderRouter.post("/" , creatOrder)
orderRouter.get("/:id" , getOrderById)
orderRouter.put("/:id" , updatOrderById)
orderRouter.delete ("/:id" , deleteOrderById)
orderRouter.get("/:id/user" , getAllOrder)

module.exports = orderRouter