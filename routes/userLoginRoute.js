const express = require("express")
const router = express.Router()
const userLoginFxn = require("../controllers/userLogin")
const {validEmail,emailEntryVaildate,validateLogin} = require("../midleware/authValidation")
const { Module } = require("module")

router.post("/user_login",validateLogin,userLoginFxn)

module.exports = router