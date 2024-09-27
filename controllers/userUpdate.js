const   {allUsers,userProfile} = require("../models/usersDb")


const userUpdateAllFxn = async(req,res)=>{
    try{
        const {id}=req.params
        const {userFName,userLName,userMail,
            userAge,usergender,userPhone,userFitnessGoals,userAddress}=req.body
      
        const allUsersUpdate = await allUsers.findByIdAndUpdate(
        id,
        {userFName,userLName,userMail,userPhone,
        userAge,usergender,userPhone,userAddress},
        {new:true})
        if(!allUsersUpdate || allUsersUpdate===''){
            return res.status(401).json({msg:"USER ID REQUIRED"})
        }
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
            return res.status(402).json({msg:err})
        };
        
    
        return res.status(200).json({
            msg:"SUCCESSFUL",
            user:allUsersUpdate,
            newUserProfileUpdate
        });
    }catch(error){
        return res.status(400).json({msg:error.message})}       
    };
    module.exports= userUpdateAllFxn