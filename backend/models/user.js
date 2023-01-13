const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  userName: { type: String, default: null },
  character: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
