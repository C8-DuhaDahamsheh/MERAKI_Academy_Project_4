const express = require("express");

const {
  addFavorit,
  getFavbyUserId,
  deleteFavbyId,
} = require("../controllers/favorit");

const favoritRouter = express.Router()

favoritRouter.post("/" , addFavorit)
favoritRouter.get("/user/:id" ,getFavbyUserId)
favoritRouter.delete("/:id",deleteFavbyId)



module.exports = favoritRouter