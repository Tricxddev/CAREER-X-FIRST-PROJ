const nutGetUserMealfxn = require("../controllers/nut_GetAllMeal")
const {authAccessTkn,emailEntryVaildate,validateLogin} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.get("/nutrition_all_meal_day_wise/:id/:date",nutGetUserMealfxn)

module.exports=router