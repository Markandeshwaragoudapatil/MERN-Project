const express = require("express");
const asyncHandler=require("../utils/asyncHandler");

const router = express.Router();

const {
    getProduct,getAllProducts,addProduct,deleteProduct,modifyProduct
} = require("../controllers/productController");
const { authenticateJWT } = require("../middleware/jwtAuthMiddleware");
const authorizeAdmin = require("../middleware/userAuthMiddleware");

router.get("/",authenticateJWT,asyncHandler(getAllProducts));
router.get("/:id",authenticateJWT,asyncHandler(getProduct));
router.post("/",authenticateJWT,authorizeAdmin,asyncHandler(addProduct));
router.delete("/:id",authenticateJWT,authorizeAdmin,asyncHandler(deleteProduct));
router.put("/:id",authenticateJWT,authorizeAdmin,asyncHandler(modifyProduct))

module.exports = router;