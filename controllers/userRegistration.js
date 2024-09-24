const   {allUsers,userProfile} = require("../models/usersDb")
const {workOutModel,excerciseModel} = require("../models/workOutDb")
const   bcrypt = require("bcrypt")



const userRegFxn = async(req,res)=>{
    try{
        
        const {userFName, userLName, userAge, 
            usergender, userMail, userPword, userPhone, 
            userAddress,userFitnessGoals}= req.body    
    
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
        await newUser.save();
        const userId =  newUser._id;
        const newUserProfile = new userProfile({
            userId:userId,
            userAge,
            usergender,
            userFitnessGoals
        });       
        await newUserProfile.save()
    
        return res.status(200).json({msg:"WELCOME ON BOARD",userProfile:{newUser,newUserProfile}})
    }
    catch(error){res.status(400).json({msg:error.message})}
    
    };
    
    module.exports = userRegFxn