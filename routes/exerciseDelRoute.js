const exerciseDelFxn = require("../controllers/exerciseDel")
const {authAccessTkn} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.delete("/exercise_delete_cat/:id",authAccessTkn,exerciseDelFxn)

module.exports=router