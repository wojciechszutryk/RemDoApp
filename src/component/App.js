import React, {useState, useEffect} from 'react';
import '../stylesheets/App.sass';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './TaskList.js';
import AddTask from './AddTask.js';
import axios from "axios";
require('dotenv').config()

const App = () => {
  let [taskNumber, setTaskNumber] = useState(3);
  const [tasks, setTasks] = useState([]);
  //   {
  //     id: 0,
  //     text: 'Wash a Car',
  //     startDate: new Date().toISOString().slice(0,10),
  //     deadline: '2022-12-31',
  //     important: false,
  //     finishDate: false,
  //   },
  //   {
  //     id: 1,
  //     text: 'Go for a walk',
  //     startDate: '2019-01-30',
  //     deadline: '2020-11-30',
  //     important: false,
  //     finishDate: false,
  //   },
  //   {
  //     id: 2,
  //     text: 'Do the shopping',
  //     startDate: '2020-12-30',
  //     deadline: '2021-12-30',
  //     important: true,
  //     finishDate: false,
  //   },
  //   {
  //     id: 4,
  //     text: 'Buy a gift for John',
  //     startDate: new Date().toISOString().slice(0,10),
  //     deadline: '2022-12-31',
  //     important: true,
  //     finishDate: '2022-12-31',
  //   },
  // ]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`)
        .then(response =>{
          if (response.data.length > 0){
            setTasks(response.data);
          }
        })
  },[])

  const handleFinishTask = (id) => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach(task => {
      if (task._id === id) {
          task.finishDate = new Date().toISOString().slice(0,10)
          axios.post(process.env.REACT_APP_SERVER_URL+'/todos/update/'+id,   {
            text: task.text,
            startDate: task.startDate,
            deadline: task.deadline,
            important: task.important,
            finishDate: new Date()
          }).then(r => console.log(r.data))
              .catch(err => console.log(err));
        }
      }
    )
    setTasks(tasksCopy);
  };

  const handleColorChange = (id, inputColor) => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach(task => {
          if (task._id === id) {
            task.color = inputColor;
            axios.post(process.env.REACT_APP_SERVER_URL+'/todos/update/'+id,   {
              text: task.text,
              startDate: task.startDate,
              deadline: task.deadline,
              important: task.important,
              finishDate: task.finishDate,
              color: inputColor,
            }).then(r => console.log(r.data))
                .catch(err => console.log(err));
          }
        }
    )
    setTasks(tasksCopy);
  };

  const handleDeleteTask = (id) => {
    const tasksCopy = [...tasks];
    tasksCopy.forEach(task => {
          if (task.id === id) {
            const index = tasksCopy.indexOf(task)
            tasksCopy.splice(index,1);
          }
        }
    )
    setTasks(tasksCopy);
  }
  const addTask = (text, important, deadline) => {
    const newTask = {
      _id: taskNumber,
      text,
      startDate: new Date().toISOString().slice(0,10),
      deadline,
      important,
      finishDate: new Date(1998,12,31).toISOString().slice(0,10),
      color: `rgb(${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)})`,
    }
    axios.post(process.env.REACT_APP_SERVER_URL+'/todos/add',   {
      text,
      startDate: new Date().toISOString().slice(0,10),
      deadline,
      important,
      finishDate: new Date(1998,12,31).toISOString().slice(0,10),
      color: `rgb(${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)})`
    }).then(r => console.log(r.data))
      .catch(err => console.log(err));
    setTasks([...tasks, newTask])
    setTaskNumber(++taskNumber);
  }

  return (
      <div className="App container-fluid">
        <div className="row">
          <h1 className="jumbotron text-center p-2 col-12" >ToDo App</h1>
          <section className='col-12 mb-3'>
            <AddTask addTask={addTask}/>
          </section>
          <hr className="col-12"/>
          <article className='col-12'>
            <TaskList tasks={tasks} finish={handleFinishTask} delete={handleDeleteTask} handleColorChange={handleColorChange}/>
          </article>
        </div>
      </div>
  )
}

export default App;
