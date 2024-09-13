// const assert = require("assert");
// const os = require("os");
const mongoose =require("mongoose");
const { type } = require("os");


const userschema= new mongoose.Schema({
    userFName:{type:String,required:true}, 
    userLName:{type:String,required:true},
    userAge:{type:Number,maxlenght:2},
    usergender:{type:String}, 
    userMail:{type:String,required:true, unique:true}, 
    userPword:{type:String,required:true, unique:true},
    userPhone:{type:Number,maxlenght:11}, 
    userAddress:{type:String},
    userPlan:{type:String, required:true}},{timestamps:true}
);

//USER PROFILE SCHEMA
const userProfileSchema = new mongoose.Schema({
    userAge:userschema.obj.userAge,
    usergender:userschema.obj.usergender,
    userPlan:userschema.obj.userPlan,
    userFitnessGoals:{type:String}
}) 

const userProfile = new mongoose.model("userProfile",userProfileSchema)
const allUsers = new mongoose.model("allUsers",userschema)


module.exports = {allUsers,userProfile};