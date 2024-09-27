const   {workOutModel} = require("../models/workOutDb.js")

const workOutDelFxn =async(req,res)=>{
    try{
        const {id}=req.params
        const delworkOutDetails = await workOutModel.findOneAndDelete(
            {userID:id})

        if(!delworkOutDetails || delworkOutDetails==='')
            {return  res.status(401).json({msg:"USER ID REQUIRED FOR THIS REQUEST"})}

        return res.status(200).json({
            msg:"SUCCESSFUL"})

    }catch(error){
        return res.status(400).json({msg:error.message})
    }
}

module.exports=workOutDelFxn