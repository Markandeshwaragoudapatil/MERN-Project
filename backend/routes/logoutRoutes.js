const express=require("express");
const router=express.Router();
const {logoutUser}=require("../controllers/logoutController");
const { authenticateJWT } = require("../middleware/jwtAuthMiddleware");

router.delete("/",authenticateJWT,logoutUser);

module.exports = router;