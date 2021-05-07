import React from 'react';
import '../stylesheets/Task.sass'
import {useState} from "react";

const Task = (props) => {
    const [col, setCol] = useState(props.task.color)
    const {_id, text, startDate, deadline, important} = props.task;

    const handleChange = function (e) {
        setCol(e.target.value)
        // props.handleColorChange(e.target.value)
    }
    return (
        <div className='task col-sm-5 col-lg-3 mb-3 ml-1 mr-1' style={{backgroundColor: col}}>
            <p>
                <span className={important ? 'important' : ''}>{text}</span>
            </p>
            <p>- started: <em>{startDate}</em></p>
            <p>- deadline: <em>{deadline}</em></p>
            <button onClick={() => props.finish(_id)}>Finish</button>
            <input type="color" onChange={handleChange}/>
            <button onClick={() => props.delete(_id)}>Delete</button>
        </div>
    );
};

export default Task;
