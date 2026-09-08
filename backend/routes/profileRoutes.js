const express = require("express");
const {getUserProfile}=require("../controllers/profileController");
const { authenticateJWT } = require("../middleware/jwtAuthMiddleware");

const router = express.Router();

router.get("/", authenticateJWT, getUserProfile);

module.exports = router;