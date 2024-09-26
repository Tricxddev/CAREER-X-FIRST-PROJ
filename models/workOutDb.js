const { time } = require("console")
const mongoose=require("mongoose")
const { type } = require("os")

const workOutSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId},
    workOutName:{type:String},
    exercise:{type:String},
    duration:{type:Number}
},{timestamps:true})

const workOutModel = new mongoose.model("workOutModel",workOutSchema)

const excerciseSchema= new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId},
    excerciseName:{type:String},
    exerciseType:{type:String},
    duration:{type:Number},
    burnedCalories:{type:String}
})

const   excerciseModel = new mongoose.model("excerciseModel",excerciseSchema)

const   userNutritionSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,ref:'allUsers',required:true},
    mealName:{type:String,required:true},
    ingredient:[{type:String,required:true}],
    nutritionalInfo:{
        calories:{type:Number,required:true},
        protein:{type:Number,required:true},
        carbs:{type:Number,required:true},
        fats:{type:Number,required:true}
    }}, {timestamps:true})

const userMealPlan = new mongoose.model("userMealPlan",userNutritionSchema)

module.exports={workOutModel,excerciseModel,userMealPlan}