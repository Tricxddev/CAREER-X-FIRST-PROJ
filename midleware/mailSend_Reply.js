const nodemailer=require("nodemailer")
const dotenv = require("dotenv")
const {allUsers} = require("../models/usersDb")
const replyUser= async(userMail)=>{
    try{
        const   sender = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:`${process.env.BotMail}`,
                pass:`${process.env.BotPass}`
            }
        })
      
        const   sendingDetails={
            from:process.env.BotMail,
            to:userMail,
            subject:"WELCOME",
            html:`<h1>welcome  </h1>
            <p>We are happy to test this with you</p>
            `
        }
        
        const result= await sender.sendMail(sendingDetails)
        
    }catch(error){
        console.log({msg:error.message})
        return res.status(400).json({msg:error.message})}
}

module.exports=replyUser