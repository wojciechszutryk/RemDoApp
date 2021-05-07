import React from 'react';

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
                        <button
                            className='finishDelete'
                            onClick={() => props.delete(_id)}>
                            x
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;
