const { json } = require("stream/consumers");
const   {allUsers,userProfile} = require("../models/usersDb")
const   bcrypt = require("bcrypt")

const userRegFxn = async(req,res)=>{
    try{
        const {userFName, userLName, userAge, 
            usergender, userMail, userPword, userPhone, 
            userAddress,userFitnessGoals}= req.body    
    
        const existingUser = await allUsers.findOne({userMail})
        if(!existingUser ||existingUser==='' ){
            return  res.status(401).json({msg:"FIELD CAN NOT BE NULL"})
        }
        if(existingUser){
            return res.status(400).json({msg:"EXISTING USER"})
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
        await newUser.save();
        const userId =  newUser._id;
        const newUserProfile = new userProfile({
            userId:userId,
            userAge,
            usergender,
            userFitnessGoals
        });       
        await newUserProfile.save()
    
        return res.status(200).json({
            msg:"SUCCESSFUL",
            userProfile:{
                newUser,
                newUserProfile}});
    }
    catch(error){res.status(400).json({msg:error.message})}
    
    };
    
    module.exports = userRegFxn