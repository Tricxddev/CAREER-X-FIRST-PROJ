const   {workOutModel} = require("../models/workOutDb.js")

const workOutupdateFxn=async(req,res)=>{
    const {id}=req.params
    const {workOutName,exercise,duration}=req.body
    try{
        const newworkOutDetails = await workOutModel.findOneAndUpdate(
            {userID:id},{workOutName,exercise,duration},{new:true})
            
        if(!newworkOutDetails || newworkOutDetails==='')
            {return  res.status(401).json({msg:"INVALID USER ID "})}

        return res.status(200).json({
            msg:"SUCCESSFUL",
            newworkOutDetails})

    }catch(error){
        return res.status(400).json({msg:error.message})
    }

}

module.exports=workOutupdateFxn