const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  MobileNo: {
    type: Number,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
