const {workOutModel,excerciseModel,userMealPlan} = require("../models/workOutDb.js")
const   {allUsers,userProfile} = require("../models/usersDb")
const nutAddMealFxn= async(req,res)=>{
    try{
    const {id}= req.params
    const{mealName,ingredient,calories,protein,carbs,fats}=req.body
    const idExist = await allUsers.findById(id)
    if(!idExist){
        return res.status(400).json("USER ID REQUIRED")
    }
    const newMealplan = new userMealPlan({
        userID:id,
        mealName,
        ingredient,
        nutritionalInfo:{
            calories:Number(calories),
            protein:Number(protein),
            carbs:Number(carbs),
            fats:Number(fats)
        },
        mealDate: new Date()})
    await newMealplan.save()
    return res.status(200).json({
        msg:"SUCCESSFUL",
        newMealplan})
    }catch(error){
        return res.status(400).json({msg:error.message})
    }   
}
module.exports=nutAddMealFxn