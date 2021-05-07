const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    text: {type:String, required: true },
    startDate: {type:Date, required: true },
    deadline: {type:Date, required: true },
    important: false,
    finishDate: Date,
    color: String,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;