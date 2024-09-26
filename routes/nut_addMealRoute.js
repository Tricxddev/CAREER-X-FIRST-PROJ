const nutAddMealFxn = require("../controllers/nut_addMeal")
const {authAccessTkn,emailEntryVaildate,validateLogin} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.post("/nutrition_add_meal/:id",nutAddMealFxn)

module.exports=router