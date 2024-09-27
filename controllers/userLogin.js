const {allUsers} = require("../models/usersDb")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userLoginFxn = async(req,res)=>{
    try{
    const {userMail,userPword}= req.body
    
    const userDetails = await allUsers.findOne({userMail})
    
    if(!userDetails){
         res.status(401).json({msg:"ACCESS DENIED"})
    }
    
    const pwMatched = await bcrypt.compare(userPword,userDetails.userPword)
    if(!pwMatched){
         res.status(401).json({msg:"ACCESS DENIED"})
    }
    const accessTKN= jwt.sign({userMail},`${process.env.Access_Token}`,{expiresIn:"60m"})
    const refreshTKN= jwt.sign({userMail},`${process.env.Refresh_Token}`,{expiresIn:"10m"})
    
    return res.status(200).json({
        msg:"SUCCESSFUL",
        accessTKN,
        userDetails,
        Date:Date()
    });
    }catch(error){
        return res.status(400).json({msg:error.message})}
    };

    module.exports = userLoginFxn