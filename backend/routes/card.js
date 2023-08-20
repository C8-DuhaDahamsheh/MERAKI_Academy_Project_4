const express = require("express");

const {
  addCard,
  deleteCardById,
  getAllCard,
  updatByProductId,
  updatByUserId,
  updteById,
} = require("../controllers/card");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authoraization");

const cardRouter = express.Router();

cardRouter.post("/", authentication, authorization("add card"), addCard);
cardRouter.get("/", authentication, authorization("add card"), getAllCard);
cardRouter.put("/:id", authentication, authorization("add card"), updteById);
cardRouter.put(
  "/:id/user",
  authentication,
  authorization("add card"),
  updatByUserId
);
cardRouter.put(
  "/:id/product",
  authentication,
  authorization("add card"),
  updatByProductId
);
cardRouter.delete(
  "/:id",
  authentication,
  authorization("add card"),
  deleteCardById
);

module.exports = cardRouter;
