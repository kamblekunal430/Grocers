const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");

// Defining the user schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    validate: [isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Minimum length must be 8 characters"],
  },
  registerDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
