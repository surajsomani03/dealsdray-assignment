const express = require("express");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
} = require("../controller/employeeController");
const upload = require("../middleware/upload");
const router = express.Router();

// Use upload.single for single file
router.post("/createEmployee", upload.single("image"), createEmployee);
router.get("/getAllEmployees", getAllEmployees);
router.get("/getEmployee/:id", getEmployeeById);
router.put("/updateEmployee/:id", upload.single("image"), updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);
router.get("/searchEmployees", searchEmployees)

module.exports = router;
