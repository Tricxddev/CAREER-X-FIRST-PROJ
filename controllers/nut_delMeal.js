const {workOutModel,excerciseModel,userMealPlan} = require("../models/workOutDb.js")
const   {allUsers,userProfile} = require("../models/usersDb")


const nut_DelMealFxn=async(req,res)=>{
    try{
        const{id}=req.params
    const delIdMeal = await userMealPlan.findOneAndDelete({userID:id})
    if(!delIdMeal){
        return res.status(400).json("ID REQUIRED FOR THIS ACTION")
    }
    return res.status(200).json({
        msg:"SUCCESSFUL"})
    }catch(error){
        return res.status(400).json({msg:error.message})
    }
}

module.exports=nut_DelMealFxn