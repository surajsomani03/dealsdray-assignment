const express = require("express");
const bcrypt = require("bcrypt");
const adminModel = require("../model/admin");
const jwt = require("jsonwebtoken")

// To create the new admin
const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    // Check if username already exists
    const existingAdmin = await adminModel.findOne({ username });

    if (existingAdmin) {
      return res.status(409).send("Username already exists");
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const admin = new adminModel({
      username,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).send("Admin created successfully");
  } catch (error) {
    res.status(500).send("Error creating admin: " + error.message);
  }
};

// To login with admin
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    const admin = await adminModel.findOne({ username });

    if (!admin) {
      return res.status(401).send("Invalid username or password");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).send("Invalid username or password");
    }

    // Generate a JWT token
    const token = jwt.sign({ username: admin.username, id: admin._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Send the token in the response
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
};

const getAdminName = async (req, res) => {
  try {
    const admin = await adminModel.findById(req.admin.id); // Access admin ID from req.admin
    if (!admin) {
      return res.status(404).send("Admin not found");
    }
    res.status(200).json({ username: admin.username });
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};


module.exports = { registerAdmin, loginAdmin, getAdminName };
