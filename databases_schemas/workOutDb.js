const mongoose=require("mongoose")

const workOutSchema = new mongoose.Schema({
    workOutType:{type:String,required:true},
    excercise:{type:String},
    duration:{type:Number,required:true}
},{timestamps:true})

const workOutdb = new mongoose.model("workOutModel",workOutSchema)

module.exports=workOutdb