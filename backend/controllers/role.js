const roleModel = require("../models/role")

const addNewRole = (req , res)=>{
    const {role , permission}=req.body

    const newRole = new roleModel({role , permission})

    newRole.save().then((result)=>{
        if(result){
            return res.status(201).json({success : true ,message : "Role Add Success",result} )
        }
    }).catch((err)=>{
        res.status(409).json({success : false , message:"error from addNew Role" ,err})
    })
}

module.exports = {addNewRole}