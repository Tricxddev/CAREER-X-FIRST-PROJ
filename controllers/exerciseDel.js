const {excerciseModel} = require("../models/workOutDb")

const exerciseDelFxn=async(req,res)=>{
    try{
    const {id}=req.params
    const delExercisedata = await  excerciseModel.findOneAndDelete({userID:id})
    if(!delExercisedata){
        return res.status(401).json("USER ID REQUIRED")
    }
    if(delExercisedata===''){
        return res.status(401).json("USER NOT FOUND")
    }
    return res.status(200).json({msg:"SUCCESSFUL"})

    }catch(error){
        return res.status(400).json({msg:error.message})}
}

module.exports=exerciseDelFxn