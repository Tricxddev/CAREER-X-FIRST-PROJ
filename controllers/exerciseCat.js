const   {allUsers} = require("../models/usersDb")
const {excerciseModel} = require("../models/workOutDb")


const exerciseCatFxn =async(req,res)=>{
    try{
    const {id}=req.params
    const {excerciseName,exerciseType,duration,burnedCalories}=req.body
    const findId= await allUsers.findById(id)
    if(!findId || findId===''){
        return  res.status(401).json("USER ID REQUIRED")}
    const newExercise = new excerciseModel({
        userID:id,
        excerciseName,
        exerciseType,
        duration,
        burnedCalories})
    await   newExercise.save()

    return  res.status(200).json({
        msg:"SUCCESSFUL",
        newExercise})
    }catch(error){return res.status(400).json({msg:error.message})}
    
}
module.exports=exerciseCatFxn