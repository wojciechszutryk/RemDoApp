import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestBody,
} from "inversify-express-utils";
import { OkResult } from "inversify-express-utils/lib/results";
import { ILoginUserDTO, IRegisterUserDTO } from "linked-models/user/user.dto";
import { URL_TASKS } from "linked-models/task/task.urls";
import { UserService } from "services/user.service";
import { TaskService } from "services/task.service";

@controller(URL_TASKS)
export class TaskController extends BaseHttpController {
  constructor(@inject(TaskService) private readonly taskService: TaskService) {
    super();
  }

  @httpGet("")
  async getAllTasks(): Promise<OkResult> {
    const tasks = await this.taskService.getAllTasks();
    return this.ok(tasks);
  }
}

// router.route("/").get((req: { a: string }, res) => {
//   Task.find()
//     .then((todos) => res.json(todos))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/:id").get((req, res) => {
//   Task.findById(req.params.id)
//     .then((todo) => res.json(todo))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/:id").delete((req, res) => {
//   Task.findByIdAndDelete(req.params.id)
//     .then(() => res.json("task deleted"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/update/:id").post((req, res) => {
//   Task.findById(req.params.id)
//     .then((todo) => {
//       todo.text = req.body.text;
//       todo.startDate = Date.parse(req.body.startDate);
//       todo.deadline = Date.parse(req.body.deadline);
//       todo.important = req.body.important;
//       todo.finishDate = Date.parse(req.body.finishDate);
//       todo.color = req.body.color;

//       todo
//         .save()
//         .then(() => res.json("Task updated successfully"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/add").post((req, res) => {
//   const text = req.body.text;
//   const startDate = Date.parse(req.body.startDate);
//   const deadline = Date.parse(req.body.deadline);
//   const important = req.body.important ? req.body.important : false;
//   const finishDate = req.body.finishDate ? req.body.finishDate : false;
//   const color = req.body.color
//     ? req.body.color
//     : `rgb(${Math.floor(Math.random() * 100)},${Math.floor(
//         Math.random() * 100
//       )},${Math.floor(Math.random() * 100)})`;

//   const newTask = new Task({
//     text,
//     startDate,
//     deadline,
//     important,
//     finishDate,
//     color,
//   });
//   newTask
//     .save()
//     .then(() => res.json(newTask._id))
//     .catch((err) => res.status(400).json("Error: " + err));
// });
