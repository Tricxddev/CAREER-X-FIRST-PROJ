const nutUpdtMealFxn = require("../controllers/nut_UpdtMeal")
const {authAccessTkn,emailEntryVaildate,validateLogin} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.put("/nutrition_updatemeal/:id",nutUpdtMealFxn)

module.exports=router