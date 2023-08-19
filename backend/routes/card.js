const express = require("express");

const {
  addCard,
  deleteCardById,
  getAllCard,
  updatByProductId,
  updatByUserId,
} = require("../controllers/card");

const cardRouter = express.Router();

cardRouter.post("/", addCard);
cardRouter.get("/", getAllCard);
cardRouter.put ("/:id/user" , updatByUserId)
cardRouter.put("/:id/product" ,updatByProductId)
cardRouter.delete("/:id" ,deleteCardById)

module.exports = cardRouter;

