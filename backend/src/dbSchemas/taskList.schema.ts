import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String },
  createdBy: String,
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
