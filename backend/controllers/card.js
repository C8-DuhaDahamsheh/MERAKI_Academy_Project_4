const card = require("../models/card");
const cardModel = require("../models/card");

const addCard = (req, res) => {
  const { product, user, quantity } = req.body;

  const newCard = new cardModel({ product, user, quantity });

  newCard
    .save()
    .then((card) => {
      res
        .status(201)
        .json({ succsee: true, message: "card created successfully", card });
    })
    .catch((err) => {
      res.status(409).json({ succsee: false, message: "server error", err });
    });
};

const getAllCard = (req, res) => {
  cardModel
    .find()
    .then((card) => {
      res.status(200).json({ success: true, message: "all the card", card });
    })
    .catch((err) => {
      res.status(409).json({ succsee: false, message: "server error", err });
    });
};

const updatByUserId = (req, res) => {
  const userId = req.params.id;

  cardModel
    .findByIdAndUpdate({ user: userId }, req.body, { new: true })
    .then((newCard) => {
      if (!newCard) {
        return res.status(404).json({
          success: false,
          message: `The card with id => ${id} not found`,
        });
      } else {
        return res.status(202).json({
          success: true,
          message: `card updated`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updatByProductId = (req, res) => {
  const productId = req.params.id;

  cardModel
    .findByIdAndUpdate({ product: productId }, req.body, { new: true })
    .then((newCard) => {
      if (!newCard) {
        return res.status(404).json({
          success: false,
          message: `The card with id => ${id} not found`,
        });
      } else {
        return res.status(202).json({
          success: true,
          message: `card updated`,
          newCard,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const deleteCardById = (req, res) => {
  const id = req.params.id;

  cardModel
    .findByIdAndDelete(id)
    .then((card) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The card with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `card deleted`,
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

module.exports = {
  addCard,
  deleteCardById,
  getAllCard,
  updatByProductId,
  updatByUserId,
};
