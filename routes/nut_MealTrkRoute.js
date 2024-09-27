const nutTrackMealFxn = require("../controllers/nut_MealTrk")
const {authAccessTkn,emailEntryVaildate,validateLogin} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.get("/nutrition_caloryTrack/:id/:date",nutTrackMealFxn)

module.exports=router