const {excerciseModel} = require("../models/workOutDb")

const   exerciseUpdateFxn = async(req,res)=>{
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
    if(!findToUpdt || findToUpdt === ''){
        return res.status(401).json({msg:"USER ID NOT FOUND"})
    }
    return res.status(200).json({
        msg:"SUCCESSFUL",
        findToUpdt})
    }catch(error){return res.status(400).json({msg:error.message})}
    
};

module.exports=exerciseUpdateFxn