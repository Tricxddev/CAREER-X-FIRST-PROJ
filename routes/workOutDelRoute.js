const workOutDelFxn = require("../controllers/workOutDel")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.delete("/workOuts_cat_delete/:id",workOutDelFxn)

module.exports=router