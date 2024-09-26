const workOutUpdateFxn = require("../controllers/workOutUpdate")
const {authAccessTkn,emailEntryVaildate,validateLogin} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.put("/exercise_update_cat/:id",workOutUpdateFxn)

module.exports=router