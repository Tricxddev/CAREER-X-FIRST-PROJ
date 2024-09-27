const exerciseUpdateFxn = require("../controllers/exerciseUpdate")
const {authAccessTkn} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.put("/exercise_update_cat/:id",authAccessTkn,exerciseUpdateFxn)

module.exports=router