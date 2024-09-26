const {workOutModel,excerciseModel,userMealPlan} = require("../models/workOutDb")

const workOutDelFxn=async(req,res)=>{
    try{
    const {id}=req.params
    const delExercisedata = await  excerciseModel.findOneAndDelete({userID:id})
    if(!delExercisedata){
        return res.status(400).json("USER ID REQUIRED")
    }
    return res.status(200).json({msg:"SUCCESSFUL"})

    }catch(error){
        return res.status(400).json({msg:error.message})}
}

module.exports=workOutDelFxn