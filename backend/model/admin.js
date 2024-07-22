const mongoose = require("mongoose")

// define the schema for the admin
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
})

// create a model
const adminModel = mongoose.model('admin', adminSchema);

module.exports = adminModel;