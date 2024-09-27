const workOutupdateFxn = require("../controllers/workOutUdate")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.put("/workOuts_cat_update/:id",workOutupdateFxn)

module.exports=router