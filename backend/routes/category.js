const express = require("express");

const { addCatgory, getAllCtegory } = require("../controllers/category");

const categoryRouter = express.Router();

categoryRouter.post("/", addCatgory);
categoryRouter.get("/", getAllCtegory);

module.exports = categoryRouter;
