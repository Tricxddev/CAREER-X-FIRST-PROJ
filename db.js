const mongoose =require("mongoose")
const dotenv = require("dotenv")
const db_connect = async()=>{
    mongoose.connect(`${process.env.DB_URL}`)
    .then(()=>{
        console.log("DATABASE CONNECTION SUCCESSFUL")
    })
}

module.exports= db_connect ;