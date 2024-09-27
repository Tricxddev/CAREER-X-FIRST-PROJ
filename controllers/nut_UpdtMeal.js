const {workOutModel,excerciseModel,userMealPlan} = require("../models/workOutDb.js")
const   {allUsers,userProfile} = require("../models/usersDb")

const nutUpdtMealFxn=async (req,res) =>{
    try{
        const {id}= req.params
        const{mealName,ingredient,calories,protein,carbs,fats}=req.body
        const findIdMealUpdt = await userMealPlan.findOneAndUpdate({
            userID:id},{
            mealName,
            ingredient,
                calories:Number(calories),
                protein:Number(protein),
                carbs:Number(carbs),
                fats:Number(fats)},
                {new:true}
            )
        return res.status(200).json({
            msg:"SUCCESSFUL",
            findIdMealUpdt})
    }catch(error){return res.status(400).json({msg:error.message})}
}
module.exports=nutUpdtMealFxn