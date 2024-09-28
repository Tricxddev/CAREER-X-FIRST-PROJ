const emptyReqFxn=(req,res)=>{
    return res.status(404).json({msg:"REDIRECTING TO LANDING PAGE"})
}
module.exports=emptyReqFxn