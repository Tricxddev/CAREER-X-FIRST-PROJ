const express = require("express")
const router = express.Router()
const userRegFxn = require("../controllers/userRegistration")
const {emailEntryVaildate} = require("../midleware/authValidation")

router.post("/userNew",emailEntryVaildate,userRegFxn)
 
module.exports =router