const favoritModel = require("../models/favorit");


const addFavorit = (req, res) => {
    const { product ,user} = req.body;
  
    const newFavorit = new favoritModel({
      product ,user
    });
  
    newFavorit
      .save()
      .then((result) => {
        if (result) {
          return res
            .status(201)
            .json({ success: true, message: "Favorit Add Successfully", result });
        }
      })
      .catch((err) => {
        res
          .status(409)
          .json({ success: false, message: "Error from Sarver", err });
      });
  };
  
  const getFavbyUserId = (req, res) => {
    let id = req.params.id;
  
    favoritModel
      .find({user:id}).populate("product").exec()
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



  const deleteFavbyId =(req,res)=>{
const id = req.params.id

favoritModel.findByIdAndDelete({_id :id}).then((fav) => {
    if (!fav) {
      return res.status(404).json({
        success: false,
        message: `The fav with id => ${id} not found`,
      });
    }
    res.status(200).json({
      success: true,
      message: `card deleted`,
      fav
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

 module.exports={addFavorit , getFavbyUserId , deleteFavbyId} 
  