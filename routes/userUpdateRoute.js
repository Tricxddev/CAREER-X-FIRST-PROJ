const  userUpdateAllFxn = require("../controllers/userUpdate")
const {authAccessTkn,emailEntryVaildate,validateLogin} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()


router.put("/update_profile/:id",authAccessTkn,userUpdateAllFxn)

module.exports=router