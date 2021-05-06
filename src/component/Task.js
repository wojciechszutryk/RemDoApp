import React from 'react';
import '../stylesheets/Task.sass'

const Task = (props) => {
    const {_id, text, startDate, deadline, important} = props.task;
    return (
        <div className='task col-sm-5 col-lg-3 mb-3 ml-1 mr-1' style={{backgroundColor: `rgb(${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)},${Math.floor(Math.random() *100)})`}}>
            <p>
                <span className={important ? 'important' : ''}>{text}</span>
            </p>
            <p>- started: <em>{startDate}</em></p>
            <p>- deadline: <em>{deadline}</em></p>
            <button onClick={() => props.finish(_id)}>Finish</button>
            <button onClick={() => props.delete(_id)}>Delete</button>
        </div>
    );
};

export default Task;
