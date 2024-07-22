const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String, // URL or path to the image
    required: true, // Make this optional if not always provided
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'], // Use enum for predefined options
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // Use enum for predefined options
    required: true,
  },
  course: {
    type: [String], // Array of strings to hold multiple courses
    enum: ['BCA', 'BSC', 'MCA', 'MSC'], // Use enum for predefined options
    required: false,
  },
  createdate: {
    type: Date,
    default: Date.now, // Automatically set the date when creating a new document
  },
});

// Create the model
const employeeModel = mongoose.model('employee', employeeSchema);

module.exports = employeeModel;
