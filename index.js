const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const   bcrypt = require("bcrypt")
const jwt   = require("jsonwebtoken")
const regRouter= require("./routes/userRegRoute")
const loginRouter= require("./routes/userLoginRoute")
const updateRouter= require("./routes/userUpdateRoute")
const workOutCreatn=require("./routes/workOutRoute")
const workOutUpdate=require("./routes/workOutUpdateRoute.js")
const workOutDeltn=require("./routes/workOutDelRoute.js")
const exerciseUpdatn=require("./routes/exerciseUpdateRoute.js")
const exerciseCrtn=require("./routes/exerciseCatRoute.js")
const exercisedeltn=require("./routes/exerciseDelRoute.js")
const nutAddMeal=require("./routes/nut_addMealRoute.js")
const nutGetAllMeal=require("./routes/nut_GetAllMealRoute.js")
const nutUpdtMeal=require("./routes/nut_updtMealRoute.js")
const nutdelMeal=require("./routes/nut_DelMEalRoute.js")
const nutMealTrk=require("./routes/nut_MealTrkRoute.js")
const allUserReq=require("./routes/allUserReqRoute.js")


//Required Dir
const db_connect = require("./db")
const  {authAccessTkn,validEmail,validateLogin,emailEntryVaildate} =require("./midleware/authValidation")
const   {allUsers,userProfile} = require("./models/usersDb")
const {workOutModel,excerciseModel,userMealPlan} = require("./models/workOutDb.js")
const { error } = require("console")

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



//GET ALL USER REQUEST
app.use("/API",allUserReq)

//USER REGISTRATION-tested
app.use("/API",regRouter);

//USER LOGIN-tested
app.use("/API",loginRouter)

//USER UPDATE-tested
app.use("/API",updateRouter)

//WORKOUT MANAGEMENT :create-TESTED
app.use("/API",workOutCreatn)

//WORKOUT MANAGEMENT :update-TESTED
app.use("/API",workOutUpdate)

//WORKOUT MANAGEMENT :delete-DONE-test
app.use("/API",workOutDeltn)

//EXERCISE MANAGEMENT: create-done-test
app.use("/API",exerciseCrtn)

//EXERCISE MANAGEMENT :update-TEST
app.use("/API",exerciseUpdatn)

//EXERCISE MANAGEMENT: delete-TEST
app.use("/API",exercisedeltn)

//NUTRITIONAL MANAGEMENT PLAN: add_meal-TEST
app.use("/API",nutAddMeal)

//NUTRITIONAL MANAGEMENT PLAN: all_meal_day_wise-TEST
app.use("/API",nutGetAllMeal)

//NUTRITIONAL MANAGEMENT PLAN: updatemeal-TEST
app.use("/API",nutUpdtMeal)

//NUTRITIONAL MANAGEMENT PLAN: deleteMeal-TEST
app.use("/API",nutdelMeal)

//NUTRITIONAL MANAGEMENT PLAN: caloryTrack
app.use("/API",nutMealTrk)