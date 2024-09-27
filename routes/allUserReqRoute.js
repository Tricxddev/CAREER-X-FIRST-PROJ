const allUserReqFxn = require("../controllers/allUserReq")
const express = require("express")
const { route } = require("./userRegRoute")
const { Module } = require("module")
const router = express.Router()

router.get("/all_users",allUserReqFxn)

module.exports=router
