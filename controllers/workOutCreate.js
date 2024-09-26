const   {allUsers,userProfile} = require("../models/usersDb")
const   {workOutModel,excerciseModel,userMealPlan} = require("../models/workOutDb.js")

const workOutCreateFxn = async(req,res)=>{
    try{const idExist = await allUsers.findById(id)
        const {id}=req.params
        const {workOutName,exercise,duration}=req.body
        if(!idExist){
            return  res.status(400).json({msg:"USER ID REQUIRED FOR THIS REQUEST"})
        }
        const workOutDetails = new workOutModel({
            userID:id,
            workOutName,
            exercise,
            duration,
            date:new Date()})
        
       await workOutDetails.save();
        return res.status(200).json({
            msg:"successful",
            details:workOutDetails})
        }catch(error){
        return res.status(400).json({msg:error.message})}
    }
    module.exports = workOutCreateFxn