const {workOutModel,excerciseModel,userMealPlan} = require("../models/workOutDb.js")
const   {allUsers,userProfile} = require("../models/usersDb")

const nutGetUserMealfxn = async(req,res)=>{
    try{    
        const {id,date}=req.params
        findID = await  userMealPlan.find({userID:id})
        if(!findID ||findID.length===0 ){
            return res.status(400).json("ID REQUIRED OR NO MEAL FOR THIS ID")
        }
        return res.status(400).json({
            msg:"SUCCESSFUL",
            findID})
    }catch(error){return res.status(400).json({msg:error.message})}
}

module.exports=nutGetUserMealfxn