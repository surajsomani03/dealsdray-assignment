const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongod connected with server`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = dbConnect;
