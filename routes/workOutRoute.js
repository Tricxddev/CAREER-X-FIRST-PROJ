const workOutCreateFxn = require("../controllers/workOutCreate")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.post("/workOuts_cat/:id",workOutCreateFxn)

module.exports=router