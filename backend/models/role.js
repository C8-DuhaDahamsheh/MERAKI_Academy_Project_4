const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
    role :{type:String} ,
    permission : [{type:String}]
})

module.exports = mongoose.model("Role" , roleSchema)