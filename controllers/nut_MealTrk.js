const {workOutModel,excerciseModel,userMealPlan} = require("../models/workOutDb.js")
const   {allUsers,userProfile} = require("../models/usersDb")


const nutTrackMealFxn=async(req,res)=>{
    try{
        const{id,date}=req.params
    const trkCalories = await userMealPlan.find({userID:id})
    if(!trkCalories){
        return res.status(400).json("ID REQUIRED FOR THIS ACTION")
    }
    if(!trkCalories.length===0){
        return res.status(400).json({msg:"NO RECORDED MEAL FOR THIS USER"})
    }

    caloryArray=[]

    trkCalories.forEach((userMeal) => {
        if (userMeal.nutritionalInfo.calories) {
            caloryArray.push(userMeal.nutritionalInfo.calories)}});
        totalCalories = caloryArray.reduce((total,calories)=>total + calories,0)    
        return res.status(200).json({
            msg:"SUCCESSFUL",
            totalCalories})}catch(error){return res.status(400).json({msg:error.message})}
}
module.exports=nutTrackMealFxn