const   {allUsers} = require("../models/usersDb")
const   {workOutModel} = require("../models/workOutDb.js")

const workOutCreateFxn = async(req,res)=>{
    try{
        const {id}=req.params
        const idExist = await allUsers.findById(id)
        const {workOutName,exercise,duration}=req.body
        if(!idExist || idExist===''){
            return  res.status(401).json({msg:"USER ID REQUIRED FOR THIS REQUEST"})
        }
        const workOutDetails = new workOutModel({
            userID:id,
            workOutName,
            exercise,
            duration,
            date:new Date()})
        
       await workOutDetails.save();
        return res.status(200).json({
            msg:"SUCCESFUL",
            details:workOutDetails})
        }catch(error){
        return res.status(400).json({msg:error.message})}
    };
    module.exports = workOutCreateFxn