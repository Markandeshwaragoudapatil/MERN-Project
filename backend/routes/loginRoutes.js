const express = require("express");
const asyncHandler=require("../utils/asyncHandler");

const router = express.Router();

const {loginUser}=require("../controllers/loginController");

router.post("/",loginUser)

module.exports = router;