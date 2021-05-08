const router = require('express').Router();
const Task = require("../models/task");

router.route('/').get((req, res) => {
    Task.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('task deleted'))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/update/:id').post((req, res) => {
    Task.findById(req.params.id)
        .then(todo => {
            todo.text = req.body.text;
            todo.startDate = Date.parse(req.body.startDate);
            todo.deadline = Date.parse(req.body.deadline);
            todo.important = req.body.important;
            todo.finishDate = Date.parse(req.body.finishDate);
            todo.color = req.body.color;

            todo.save()
                .then(() => res.json('Task updated successfully'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const text = req.body.text;
    const startDate = Date.parse(req.body.startDate);
    const deadline = Date.parse(req.body.deadline);
    const important = req.body.important ? req.body.important : false;
    const finishDate = req.body.finishDate ? req.body.finishDate : false;
    const color = req.body.color ? req.body.color : `rgb(${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)})`;

    const newTask = new Task({text, startDate, deadline, important, finishDate, color})
    newTask.save()
        .then(() => res.json(newTask._id))
        .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;