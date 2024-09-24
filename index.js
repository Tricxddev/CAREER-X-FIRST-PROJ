const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const   bcrypt = require("bcrypt")
const jwt   = require("jsonwebtoken")
const regRouter= require("./routes/userRegRoute")
const loginRouter= require("./routes/userLoginRoute")
const updateRouter= require("./routes/userUpdateRoute")

//Required Dir
const db_connect = require("./db")
const  {authAccessTkn,validEmail,validateLogin,emailEntryVaildate} =require("./midleware/authValidation")
const   {allUsers,userProfile} = require("./models/usersDb")
const {workOutModel,excerciseModel} = require("./models/workOutDb")

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
});

app.post("/test",(req,res)=>{
console.log(req.body)
});

//update Profile
app.put("/update_profile/:id",authAccessTkn,async(req,res)=>{
try{
    const {id}=req.params
    const {userFName,userLName,userMail,
        userAge,usergender,userPhone,userFitnessGoals,userAddress}=req.body
  
    const allUsersUpdate = await allUsers.findByIdAndUpdate(
    id,
    {userFName,userLName,userMail,userPhone,
    userAge,usergender,userPhone,userAddress},
    {new:true})

    const newUserProfileUpdate = await userProfile.findOneAndUpdate(
        {userId:id},
        {userAge,usergender,userFitnessGoals},
        {new:true}
    )
    err=[]
    if(!allUsersUpdate){
        err.push("USER DB NOT UPDTATED")
    }
    if(!newUserProfileUpdate){
        err.push("USER PROFILE NOT UPDTATED")
    }
    if(err.length>0){
        return res.status(400).json({msg:err})
    };
    

    return res.status(200).json({
        msg:"SUCCESSFUL",
        user:allUsersUpdate,
        newUserProfileUpdate
    })
}catch(error){
    return res.status(400).json({msg:error.message})}
   
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

const {workOutType,excercise,duration}=req.body

const workOutDetails = new workOutModel({workOutType,excercise,duration,date:date()})

workOutDetails.save()
return res.status(200).json({
    msg:"successful",
    details:workOutDetails})
});

//WORKOUT CRUD: GET 
app.get("/",(req,res)=>{

})
//USER REGISTRATION
app.use("/API",regRouter);

//USER LOGIN
app.use("/API",loginRouter)

//USER UPDATE
app.use("/API",updateRouter)