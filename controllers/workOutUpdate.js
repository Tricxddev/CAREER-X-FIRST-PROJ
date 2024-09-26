const {workOutModel,excerciseModel,userMealPlan} = require("../models/workOutDb")

const   workOutUpdateFxn = async(req,res)=>{
    try{
    const {id}=req.params
    const {excerciseName,exerciseType,duration,burnedCalories}=req.body
    const findToUpdt = await excerciseModel.findOneAndUpdate(
        {userID:id},
        {excerciseName,
        exerciseType,
        duration,
        burnedCalories},
        {new:true})
    if(!findToUpdt){
        return res.status(400).json("USER ID NOT FOUND")
    }
    return res.status(200).json({
        msg:"SUCCESSFUL",
        findToUpdt})
    }catch(error){return res.status(400).json({msg:error.message})}
    
}

module.exports=workOutUpdateFxn