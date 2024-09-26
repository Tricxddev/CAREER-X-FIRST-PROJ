const workOutCreateFxn = require("../controllers/workOutCreate")
const {authAccessTkn,emailEntryVaildate,validateLogin} = require("../midleware/authValidation")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.post("/workOuts_cat/:id",workOutCreateFxn)

module.exports=router