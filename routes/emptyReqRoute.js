const emptyReqFxn = require("../controllers/emptyReq")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.get("/",emptyReqFxn)

module.exports=router
