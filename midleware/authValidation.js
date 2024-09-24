const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const   bcrypt = require("bcrypt")
const jwt   = require("jsonwebtoken")


const emailEntryVaildate = async(req,res,next)=>{
    const {userFName, userLName, userDob, usergender, userMail, userPword, userPhone, useraddress, 
        userPlan}= req.body 

        const err = []
        
        if(!userFName){
             err.push({msg:"First Name Should not be empty, Kindly check"})
        }
        if(!userLName){
             err.push({msg:"Last Name Should not be empty, Kindly check"})
        }
        if(!userMail){
             err.push({msg:"Please Enters your Email"})
        }else if(!validEmail(userMail)){
             err.push("Email not in right format")
        }
        if(!userPword){
             err.push({msg:"Please Enters your Password"})
        }
        // if(!userPlan){
        //     return res.push({msg:"Plan Number Required"})
        // }
        if(userPword.length >10){
             err.push({msg:"Password lenght exeeded, please check"})
        }
        if(err.length>0){
           return res.status(400).json({msg:err})
        };
        
        next()

};

const validateLogin = async(req,res,next)=>{
    const {userMail,userPword}= req.body
    const err=[]
    if(!userMail || !userPword){
         err.push("PLEASE ENTER CORRECT CREDENTIALS")
    }else if(!validEmail(userMail)){
         err.push("WRONG EMAIL FORMAT ENTERED")
    }
    if(err.length > 0){
        return res.status(400).json({msg:err})
    }
    next()
}

//jwt auth middleware


const authAccessTkn = async(req,res,next)=>{
     const headerExist = req.header('Authorization')
     if(!headerExist){
          return  res.status(400).json({msg:"TOKEN NOT IN HEADER"})
     }
     const accessTKN =headerExist.split(' ')[1]

     if(!accessTKN){
          return  res.status(400).json('TOKEN NOT IN RIGHT FORMATTED')
     }
     try{const verifyTkn = await jwt.verify(accessTKN,process.env.Access_Token)
          req.user = verifyTkn
 
          next()
     }catch(error){
          return res.status(400).json({msg:error.message})
     }
     }


// Validate Email With Regex
const validEmail = (userMail) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(userMail).toLowerCase());
}
module.exports = {authAccessTkn,validEmail,emailEntryVaildate,validateLogin} ;
