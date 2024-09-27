const emptyReqFxn=(req,res)=>{
    return res.status(404).json({msg:"ACCESS DENIED"})
}
module.exports=emptyReqFxn