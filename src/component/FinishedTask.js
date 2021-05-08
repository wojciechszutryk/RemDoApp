import React from 'react';
import {DeleteButton} from "./styledComponents";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const Task = (props) => {
    const {_id, text, startDate, finishDate} = props.task;
    return (
        <div className={'finishedWrapper container'}>
            <div className={'row'}>
                <div className={'row col-12 col-lg-10 offset-lg-1'}>
                    <span className={'col-10 order-1 col-sm-4'}>{text}</span>
                    <span className={'col-6 order-3 col-sm-3'}>started: <em>{startDate.slice(0,10)} </em></span>
                    <span className={'col-6 order-4 col-sm-3'}>finished: <em>{finishDate.slice(0,10)}</em></span>
                    <div className='col-2 order-2 order-sm-12'>
                        <DeleteButton
                            buttonType={'delete'}
                            onClick={() => props.delete(_id)}
                            style={{fontSize: '14px', position: 'relative'}}
                        >
                            <FontAwesomeIcon style={{transform: 'translateY(20%)', position: 'absolute'}} icon={faTrashAlt} />
                        </DeleteButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;
