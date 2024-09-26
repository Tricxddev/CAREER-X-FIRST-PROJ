const workOutDelFxn = require("../controllers/workOutDel")
const {authAccessTkn,emailEntryVaildate,validateLogin} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.delete("/exercise_delete_cat/:id",authAccessTkn,workOutDelFxn)

module.exports=router