const categoryModel = require("../models/category");

const addCatgory = (req, res) => {
  const { name, imag } = req.body;

  const newCategory = new categoryModel({ name, imag });

  newCategory
    .save()
    .then((result) => {
      if (result) {
        return res
          .status(201)
          .json({
            success: true,
            message: "Category Add Successfully",
            result,
          });
      }
    })
    .catch((err) => {
      res.status(409).json({ success: false, message: "Sarver Erorr", err });
    });
};

const getAllCtegory = (req, res) => {
  categoryModel
    .find()
    .then((category) => {
      res
        .status(200)
        .json({ success: true, message: "all the  category", category });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: "server error", err });
    });
};

module.exports = { addCatgory, getAllCtegory };
