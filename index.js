const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const   bcrypt = require("bcrypt")
const jwt   = require("jsonwebtoken")

//Required Dir
const db_connect = require("./db")
const  {validEmail,validateLogin,emailEntryVaildate} =require("./midleware/authValidation")
const   {allUsers,userProfile} = require("./databases_schemas/usersDb")
const workOutdb = require("./databases_schemas/workOutDb")

dotenv.config()

const app = express()
PORT = process.env.PORT || 5000 ;

//epress middleware parse
app.use(express.json())
app.use('./midleware/authValidation', emailEntryVaildate);
//npm port testing
app.listen(PORT,()=>{
console.log(`This server now runs on PORT:${PORT}`)
})

//db connection
db_connect()

// TESTING RESPONSE
app.get("/",(req,res)=>{
    res.json("JUST TESTING MY RESPONSE")
    console.log("POSTMAN SUCCESSFUL")
})


//New user API
app.post("/userNew",emailEntryVaildate,async(req,res)=>{
try{
    
    const {userFName, userLName, userAge, usergender, userMail, userPword, userPhone, userAddress}= req.body


    const existingUser = await allUsers.findOne({userMail})
    if(existingUser){
        return res.status(400).json({msg:"This user already Exist"})
    }

    const userPlan = Math.floor(Math.random()*`${process.env.userPl}`)

    const pwordhashed = await bcrypt.hash(userPword,12)

    const   newUser = new allUsers({
        userFName, 
        userLName, 
        userAge, 
        usergender, 
        userMail, 
        userPword:pwordhashed, 
        userPhone, 
        userAddress,
        userPlan
    })
    newUser.save()

    return res.status(200).json({msg:"WELCOME ON BOARD",user:newUser})
}
catch(error){res.status(400).json({msg:error.message})}

}
)


app.post("/test",(req,res)=>{
console.log(req.body)
})

//USER LOGIN
app.post("/user_login",validateLogin,async(req,res)=>{
try{
const {userMail,userPword}= req.body

const userDetails = await allUsers.findOne({userMail})

if(!userDetails){
    return res.status(200).json({msg:"USER NOT FOUND"})
}

const pwMatched = await bcrypt.compare(userPword,userDetails.userPword)
if(!pwMatched){
    return res.status(401).json({msg:"INVALID LOGIN DETAILS"})
}
const accessTKN= jwt.sign({userMail},`${process.env.Access_Token}`,{expiresIn:"10m"})
const refreshTKN= jwt.sign({userMail},`${process.env.Refresh_Token}`,{expiresIn:"10m"})

return res.status(200).json({
    msg:"SUCCESSFUL LOGIN",
    accessTKN,
    userDetails,
    Date:Date()

})
}catch(error){
    return res.status(400).json({msg:error.message})}

})

//update Profile
app.patch("/update_profile/:id",async(req,res)=>{
try{
    const {id}=req.params
    const {userFName,userLName,userMail,
        userAge,usergender,userPhone,userFitnessGoals,userPlan,userAddress}=req.body
  
// const findId = await allUsers.findOne({id})
// if(!findId){
//     return res.status(400).json({msg:"UNKNOWN USER"})
// }
    const ProfileUpdate = await allUsers.findByIdAndUpdate(
    id,
    {userFName,userLName,userMail,userPhone,
    userAge,usergender,userPhone,userFitnessGoals,userPlan,userAddress},
    {new:true})

    return res.status(200).json({
        msg:"SUCCESSFUL",
        user:ProfileUpdate})
}catch(error){
    return res.status(400).json({msg:error.message})
}
   
})

//GET ALL USER
app.get("/all_users",async(req,res)=>{
    const   findAll = await allUsers.find()
    if(findAll){
        return res.status(200).json({findAll})
    }
})

//WORKOUT MANAGEMENT : RUNNING/JUGGING
app.post("/run_jug_stat",async(req,res)=>{




})