const order = require("../models/order");
const orderModel = require("../models/order");

const creatOrder = (req, res) => {
  const { user, card, phoneNumber } = req.body;

  const newOrder = new orderModel({ user, card, phoneNumber });

  newOrder
    .save()
    .populate("user")
    .populate("card")
    .then((order) => {
      res.status(201).json({
        success: true,
        message: `Order created`,
        order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getOrderById = (req, res) => {
  const id = req.params.id;

  orderModel
    .findById(id)
    .populate("user")
    .populate("card")
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          success: false,
          message: `The order with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The order ${id} `,
        order,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updatOrderById = (req, res) => {
  const id = req.params.id;

  orderModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .populate("user")
    .populate("card")
    .then((newOrder) => {
      if (!newOrder) {
        return res.status(404).json({
          success: false,
          message: `The order with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Order updated`,
        order: newOrder,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteOrderById = (req, res) => {
  const id = re.params.id;

  orderModel
    .findByIdAndDelete(id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          success: false,
          message: `The order with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `Order deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};


module.exports = {creatOrder , getOrderById , updatOrderById , deleteOrderById}