const nut_DelMealFxn = require("../controllers/nut_delMeal")
const {authAccessTkn,emailEntryVaildate,validateLogin} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.delete("/nutrition_deleteMeal/:id",nut_DelMealFxn)
module.exports=router