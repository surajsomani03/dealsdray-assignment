const { registerAdmin, loginAdmin, getAdminName } = require("../controller/adminController");
const express = require('express');
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

// Define the routes
router.post('/registerAdmin', registerAdmin);
router.post("/loginAdmin",loginAdmin)
router.get("/getAdminName",authenticateToken, getAdminName)

module.exports = router;
