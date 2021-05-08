import React from 'react';
import '../stylesheets/Task.sass'
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt, faCheckSquare} from "@fortawesome/free-solid-svg-icons";
import {DeleteButton, StyledColorInput, SubmitButton} from "./styledComponents";

const Task = (props) => {
    const [col, setCol] = useState(props.task.color);
    const [timeoutId, setTimeoutId] = useState(0);
    const {_id, text, startDate, deadline, important} = props.task;

    const hex2rgba = (hex, alpha = 1) => {
        const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
        return `rgba(${r+r/3},${g+g/3},${b+b/3},${alpha})`;
    };

    const handleChange = function (_id, e) {
        clearTimeout(timeoutId)
        setCol(e.target.value)
        const timeout = setTimeout(() => props.handleColorChange(_id, e.target.value), 1000);
        setTimeoutId(timeout)
    }

    const daysLeft = Math.ceil((new Date(deadline)-new Date())/1000/60/60/24);
    const daysLeftCommunicate = daysLeft >= 0 ? `${daysLeft} days left` : `${-daysLeft} days delay`;

    return (
        <div className='task col-sm-5 col-lg-3 mb-3 ml-1 mr-1'
             style={{backgroundColor: col, border: `7px solid`, borderColor: important ? `${hex2rgba(col)}` : `${col}`}}>
            <p>
                <span className={important ? 'importantColor' : ''}>{text}</span>
            </p>
            <p>- started: <em>{startDate.slice(0,10)}</em></p>
            <p>- deadline: <em className={daysLeft < 0 ? 'importantColor' : ''}>{daysLeftCommunicate}</em></p>
            <SubmitButton buttonType={'delete'} onClick={() => props.finish(_id)}>
                <FontAwesomeIcon icon={faCheckSquare} />
            </SubmitButton>
            <StyledColorInput type="color" onChange={(e) => handleChange(_id, e)}/>
            <DeleteButton buttonType={'delete'} onClick={() => props.delete(_id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </DeleteButton>
        </div>
    );
};

export default Task;
