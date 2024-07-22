const employeeModel = require("../model/employee");
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// creation of employee
const createEmployee = async (req, res) => {
  try {
    const { id, name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.path : null; // Extract image path if present

    // Validate required fields
    if (!id || !name || !email || !mobile || !designation || !gender) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    // Convert course from string to array
    let courseArray = [];
    if (typeof course === "string") {
      try {
        courseArray = JSON.parse(course); // Parse JSON string into array
      } catch (error) {
        return res.status(400).json({ message: "Invalid course format" });
      }
    } else if (Array.isArray(course)) {
      courseArray = course;
    }

    // Create a new employee
    const newEmployee = new employeeModel({
      id,
      name,
      email,
      mobile,
      designation,
      gender,
      course: courseArray, // Use the parsed course array
      image, // Save image path if present
    });

    // Save the employee to the database
    await newEmployee.save();

    // Respond with success
    res.status(201).json({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//get all the information of the employee

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find();

    // check employee were found
    if (!employees.length) {
      return res.status(404).json({ message: "no employees found" });
    }

    // employees data
    res
      .status(200)
      .json({
        message: "Employees fetched successfully",
        employees: employees,
      });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await employeeModel.findOne({ id });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Construct the image URL if the image exists
    if (employee.image) {
      employee.image = `${req.protocol}://${req.get('host')}/uploads/${path.basename(employee.image)}`;
    }

    res.status(200).json({
      message: 'Employee fetched successfully',
      employee: employee,
    });
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
// Update employee by ID
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.path : null; // Extract image path if present

    // Validate required fields
    if (!name || !email || !mobile || !designation || !gender) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    // Convert course from string to array
    let courseArray = [];
    if (typeof course === "string") {
      try {
        courseArray = JSON.parse(course); // Parse JSON string into array
      } catch (error) {
        return res.status(400).json({ message: "Invalid course format" });
      }
    } else if (Array.isArray(course)) {
      courseArray = course;
    }

    // Find and update the employee
    const updatedEmployee = await employeeModel.findOneAndUpdate(
      { id },
      {
        name,
        email,
        mobile,
        designation,
        gender,
        course: courseArray,
        image: image ? path.basename(image) : undefined, // Update image path if present
      },
      { new: true } // Return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Respond with success
    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the employee using the string ID
    const employee = await employeeModel.findOne({ id });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Delete the employee
    await employeeModel.deleteOne({ id });

    // Handle image deletion
    if (employee.image) {
      const imagePath = path.join(__dirname, '../uploads', employee.image); // Adjust the path as needed

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Error deleting employee' });
  }
};

// Search employees by ID, name, or email
const searchEmployees = async (req, res) => {
  try {
    const { employeeID, name, email } = req.query;
    
    // Build search criteria
    const searchCriteria = {};
    if (employeeID) searchCriteria.id = employeeID;
    if (name) searchCriteria.name = new RegExp(name, 'i'); // Case-insensitive search
    if (email) searchCriteria.email = new RegExp(email, 'i'); // Case-insensitive search

    // Find employees based on criteria
    const employees = await employeeModel.find(searchCriteria);

    // Check if employees were found
    if (!employees.length) {
      return res.status(404).json({ message: 'No employees found' });
    }

    res.status(200).json({ message: 'Employees fetched successfully', employees });
  } catch (error) {
    console.error('Error searching employees:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, searchEmployees };