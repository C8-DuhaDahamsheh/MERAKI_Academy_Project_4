const productModel = require("../models/product");

const addProduct = (req, res) => {
  const { name, discreption, price, image, size, color, category } = req.body;

  const newProduct = new productModel({
    name,
    discreption,
    price,
    image,
    size,
    color,
    category,
  });

  newProduct
    .save()
    .then((result) => {
      if (result) {
        return res
          .status(201)
          .json({ success: true, message: "Product Add Successfully", result });
      }
    })
    .catch((err) => {
      res
        .status(409)
        .json({ success: false, message: "Error  from Sarver", err });
    });
};

const getByCategoryId = (req, res) => {
  let id = req.params.id;

  productModel
    .find({category:id}).populate("category")
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `The product with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The product ${id} `,
        product,
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



const getProductById =(req , res)=>{
  let id = req.params.id;

  productModel.findById({})
}

module.exports = { addProduct, getByCategoryId };
