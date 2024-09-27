const exerciseCatFxn = require("../controllers/exerciseCat")
const {authAccessTkn} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.post("/exercise_cat/:id",exerciseCatFxn)
module.exports=router
