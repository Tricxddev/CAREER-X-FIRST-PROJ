const { error } = require("console")
const {allUsers} = require("../models/usersDb")

const allUserReqFxn=async(req,res)=>{
    try{
        const   findAll = await allUsers.find()
    if(!findAll){
        return res.status(401).json({msg:"EMPTY DATABASE"})}
    if(findAll){
        return res.status(200).json({findAll})}
    }catch(error){
        return res.status(400).json({msg:error.message})}
};
module.exports=allUserReqFxn