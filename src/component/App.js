import React, {useState, useEffect} from 'react';
import '../stylesheets/App.sass';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskList from './TaskList.js';
import AddTask from './AddTask.js';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
require('dotenv').config()

const App = () => {
  toast.configure();
  let [taskNumber, setTaskNumber] = useState(3);
  const [tasks, setTasks] = useState([]);

  const informationNotification = (message) =>{
    toast.error(message, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      button: false,
      progress: undefined,
    });
  };

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
    informationNotification("Task finished");
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
              color: inputColor.toString(),
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
          if (task._id === id) {
            const index = tasksCopy.indexOf(task)
            tasksCopy.splice(index,1);
            axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`)
                .then(response => response)
          }
        }
    )
    setTasks(tasksCopy);
    informationNotification("Task deleted");
  };

  const addTask = (text, important, deadline) => {
    axios.post(process.env.REACT_APP_SERVER_URL+'/todos/add',   {
      text,
      startDate: new Date().toISOString().slice(0,10),
      deadline,
      important,
      finishDate: new Date(1998,12,31).toISOString().slice(0,10),
      color: `rgb(${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)})`
    }).then(r => {
      const newTask = {
        _id: r.data,
        text,
        startDate: new Date().toISOString().slice(0,10),
        deadline,
        important,
        finishDate: new Date(1998,12,31).toISOString().slice(0,10),
        color: `rgb(${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)})`,
      }
      setTasks([...tasks, newTask])
    })
      .catch(err => console.log(err));
    setTaskNumber(++taskNumber);
    informationNotification("Task added");
  }

  return (
      <>
        <div className="App container-fluid">
          <div className="row">
            <h1 className="text-center p-2 col-12" >ToDo App</h1>
            <section className='col-12 mb-3'>
              <AddTask addTask={addTask}/>
            </section>
            <hr style={{width: '100vw'}}/>
            <article className='col-12'>
              <TaskList tasks={tasks} finish={handleFinishTask} delete={handleDeleteTask} handleColorChange={handleColorChange}/>
            </article>
          </div>
        </div>
        <ToastContainer />
      </>
  )
}

export default App;
