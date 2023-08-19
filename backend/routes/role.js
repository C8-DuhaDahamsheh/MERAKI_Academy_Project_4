const express = require("express")

const {addNewRole} = require("../controllers/role")


const roleRouter = express.Router()

roleRouter.post("/" , addNewRole)



module.exports = roleRouter