const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { fname, lname, age, country, email, password, role } = req.body;

  const newUser = new userModel({
    fname,
    lname,
    age,
    country,
    email,
    password,
    role,
  });

//saler role id = "64e21139f853bb6a9f066186"
//customer role id ="64e211c3a8d39e6e0caf32c0"



  newUser
    .save()
    .then((result) => {
      if (result) {
        return res.status(201).json({
          success: true,
          message: "Account Created Successfully",
          result,
        });
      }
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: `The email already exists`,
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  userModel
    .findOne({ email })
    .populate("role")
    .then(async (result) => {
      if (result === null) {
        res
          .status(401)
          .json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          role: result.role,
          country: result.country,
        };

        const options = {
          expiresIn: "5h",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        console.log(token);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({success: false,
        message: `Server Error`,
        err: err.message,});
    });
};

module.exports = { register, login };
