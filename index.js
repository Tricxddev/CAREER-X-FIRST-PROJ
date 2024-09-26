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
const {workOutModel,excerciseModel,userMealPlan} = require("./models/workOutDb")
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


//GET ALL USER
app.get("/all_users",async(req,res)=>{
    const   findAll = await allUsers.find()
    if(findAll){
        return res.status(200).json({findAll})
    }
})

//WORKOUT MANAGEMENT :create
app.post("/workOuts_cat/:id",async(req,res)=>{
const {id}=req.params
const {workOutName,exercise,duration}=req.body
try{const idExist = await allUsers.findById(id)
    if(!idExist){
        return  res.status(400).json({msg:"USER ID REQUIRED FOR THIS REQUEST"})
    }
    const workOutDetails = new workOutModel({
        userID:id,
        workOutName,
        exercise,
        duration,
        date:new Date()})
    
   await workOutDetails.save();
    return res.status(200).json({
        msg:"successful",
        details:workOutDetails})
    }catch(error){
    return res.status(400).json({msg:error.message})}
});


//WORKOUT MANAGEMENT :update
app.put("/workOuts_cat_update/:id",async(req,res)=>{
    const {id}=req.params
    const {workOutName,exercise,duration}=req.body
    try{
        const newworkOutDetails = await workOutModel.findOneAndUpdate(
            {userID:id},{workOutName,exercise,duration},{new:true})
            
        if(!newworkOutDetails)
            {return  res.status(400).json({msg:"USER ID REQUIRED FOR THIS REQUEST"})}

        return res.status(200).json({
            msg:"SUCCESSFUL",
            newworkOutDetails})

    }catch(error){
        return res.status(400).json({msg:error.message})
    }

})
//WORKOUT MANAGEMENT :delete
app.delete("/workOuts_cat_delete/:id",authAccessTkn,async(req,res)=>{
    const {id}=req.params
    try{

        const delworkOutDetails = await workOutModel.findOneAndDelete(
            {userID:id})

        if(!delworkOutDetails)
            {return  res.status(400).json({msg:"USER ID REQUIRED FOR THIS REQUEST"})}

        return res.status(200).json({
            msg:"SUCCESSFUL"})

    }catch(error){
        return res.status(400).json({msg:error.message})
    }

})


//EXERCISE MANAGEMENT: create
app.post("/exercise_cat/:id",async(req,res)=>{
    const {id}=req.params
    const {excerciseName,exerciseType,duration,burnedCalories}=req.body
    const findId= await allUsers.findById(id)
    if(!findId){
        return  res.status(400).json("USER ID REQUIRED")
    }
    const newExercise = new excerciseModel({
        userID:id,
        excerciseName,
        exerciseType,
        duration,
        burnedCalories})
    await   newExercise.save()

    return  res.status(200).json({
        msg:"SUCCESSFUL",
        newExercise})
});

//EXERCISE MANAGEMENT: update
app.put("/exercise_update_cat/:id",authAccessTkn,async(req,res)=>{
    const {id}=req.params
    const {excerciseName,exerciseType,duration,burnedCalories}=req.body
    const findToUpdt = await excerciseModel.findOneAndUpdate(
        {userID:id},
        {excerciseName,exerciseType,duration,burnedCalories},
        {new:true})
    if(!findToUpdt){
        return res.status(400).json("USER ID NOT FOUND")
    }

    return res.status(200).json({msg:"SUCCESSFUL",findToUpdt})

})

//EXERCISE MANAGEMENT: delete
app.delete("/exercise_delete_cat/:id",authAccessTkn,async(req,res)=>{
    try{
    const {id}=req.params
    const delExercisedata = await  excerciseModel.findOneAndDelete({userID:id})
    if(!delExercisedata){
        return res.status(400).json("USER ID REQUIRED")
    }
    return res.status(200).json({msg:"SUCCESSFUL"})

    }catch(error){
        return res.status(400).json({msg:error.message})}
    

})

//NUTRITIONAL MANAGEMENT PLAN: add_meal
app.post("/nutrition_add_meal/:id",async(req,res)=>{
    try{
        const {id}= req.params
    const{mealName,ingredient,calories,protein,carbs,fats}=req.body
    const idExist = await allUsers.findById(id)
    if(!idExist){
        return res.status(400).json("USER ID REQUIRED")
    }
    const newMealplan = new userMealPlan({
        userID:id,
        mealName,
        ingredient,
        nutritionalInfo:{
            calories:Number(calories),
            protein:Number(protein),
            carbs:Number(carbs),
            fats:Number(fats)
        },
        mealDate: new Date()})
    await newMealplan.save()
    return res.status(200).json({
        msg:"SUCCESSFUL",
        newMealplan})
    }catch(error){
        return res.status(400).json({msg:error.message})
    }
    
})

//NUTRITIONAL MANAGEMENT PLAN: all_meal_day_wise
app.get("/nutrition_all_meal_day_wise/:id/:date",async(req,res)=>{
    try{    
        const {id,date}=req.params
        findID = await  userMealPlan.find({userID:id})
        if(!findID ||findID.length===0 ){
            return res.status(400).json("ID REQUIRED OR NO MEAL FOR THIS ID")
        }
        return res.status(400).json({
            msg:"SUCCESSFUL",
            findID})
    }catch(error){
        return res.status(400).json({msg:error.message})
    }
})

//NUTRITIONAL MANAGEMENT PLAN: updatemeal
app.put("/nutrition_updatemeal/:id",async (req,res) =>{
    try{
        const {id}= req.params
        const{mealName,ingredient,calories,protein,carbs,fats}=req.body
        const findIdMealUpdt = await userMealPlan.findOneAndUpdate({
            userID:id},{
            mealName,
            ingredient,
                calories:Number(calories),
                protein:Number(protein),
                carbs:Number(carbs),
                fats:Number(fats)},
                {new:true}
            )
        return res.status(200).json({
            msg:"SUCCESSFUL",
            findIdMealUpdt})
    }catch(error){
        return res.status(400).json({msg:error.message})
    }

})

//NUTRITIONAL MANAGEMENT PLAN: deleteMeal
app.delete("/nutrition_deleteMeal/:id",async(req,res)=>{
    try{
        const{id}=req.params
    const delIdMeal = await userMealPlan.findOneAndDelete({userID:id})
    if(!delIdMeal){
        return res.status(400).json("ID REQUIRED FOR THIS ACTION")
    }
    return res.status(200).json({
        msg:"SUCCESSFUL"})
    }catch(error){
        return res.status(400).json({msg:error.message})
    }
    
    
})

//NUTRITIONAL MANAGEMENT PLAN: caloryTrack
app.get("/nutrition_caloryTrack/:id/:date",async(req,res)=>{
    const{id,date}=req.params
    const trkCalories = await userMealPlan.find({userID:id})
    if(!trkCalories){
        return res.status(400).json("ID REQUIRED FOR THIS ACTION")
    }
    if(!trkCalories.length===0){
        return res.status(400).json({msg:"NO RECORDED MEAL FOR THIS USER"})
    }

    caloryArray=[]

    trkCalories.forEach((userMeal) => {
        if (userMeal.nutritionalInfo.calories) {
            caloryArray.push(userMeal.nutritionalInfo.calories)}});
        totalCalories = caloryArray.reduce((total,calories)=>total + calories,0)    
        return res.status(200).json({
            msg:"SUCCESSFUL",
            totalCalories})
})

//USER REGISTRATION
app.use("/API",regRouter);

//USER LOGIN
app.use("/API",loginRouter)

//USER UPDATE
app.use("/API",updateRouter)