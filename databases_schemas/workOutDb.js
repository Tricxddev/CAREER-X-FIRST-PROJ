const { time } = require("console")
const mongoose=require("mongoose")
const { type } = require("os")

const workOutSchema = new mongoose.Schema({
    workOutType:{type:String,required:true},
    excercise:{type:String},
    duration:{type:Number,required:true}
},{timestamps:true})

const workOutModel = new mongoose.model("workOutModel",workOutSchema)

const excerciseSchema= new mongoose.Schema({
    excerciseName:{type:String},
    excerciseType:{type:String},
    duration:{type:Number},
    burnCalories:{type:String}
})

const   excerciseModel = new mongoose.model("excerciseModel",excerciseSchema)

module.exports={workOutModel,excerciseModel}