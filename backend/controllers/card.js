const card = require("../models/card");
const cardModel = require("../models/card");

const addCard = async (req, res) => {
  try {
    const { product, quantity ,isOrderd } = req.body;
    const user = req.token.userId
    const newCard = new cardModel({ product, user, quantity ,isOrderd  });
    const card = await newCard.save();
    res
      .status(201)
      .json({ succsee: true, message: "card created successfully", card });
  } catch (error) {
    res.status(409).json({ succsee: false, message: "server error", error });
  }
};

const getAllCard = (req, res) => {
  cardModel
    .find({isOrderd:false}).populate("product")
    .then((card) => {
      res.status(200).json({ success: true, message: "all the card", card });
    })
    .catch((err) => {
      res.status(409).json({ succsee: false, message: "server error", err });
    });
};

const updteById = (req, res) => {
  const id = req.params.id;

  cardModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
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

const updatByUserId = (req, res) => {
  const userId = req.params.id;

  cardModel
    .updateMany({ user: userId }, req.body, { new: true })
    .then((newCard) => {
      console.log(newCard);
      if (!newCard) {
        return res.status(404).json({
          success: false,
          message: `The card with id => ${userId} not found`,
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
    .findOneAndUpdate({ product: productId }, req.body, { new: true })
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
    .findByIdAndDelete({ _id: id })
    .then((card) => {
      if (!card) {
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

const deletAllCard =(req,res)=>{
  const userId = req.params.id
  cardModel.deleteMany({user :userId}).then((card)=>{
    if (!card) {
      return res.status(404).json({
        success: false,
        message: `The card with user id => ${userId} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `card deleted`,
    });
  }).catch((err)=>{

    console.log(err);
  })
}


module.exports = {
  addCard,
  deleteCardById,
  getAllCard,
  updatByProductId,
  updatByUserId,
  updteById,
  deletAllCard
};
