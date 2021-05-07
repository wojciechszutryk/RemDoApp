import React from 'react';
import Task from './Task.js'
import '../stylesheets/TaskList.sass'
import FinishedTask from './FinishedTask.js'

class TaskList extends React.Component {
    state = {
        sort: 'dateDesc',
        search: '',
    }

    handleSearchChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    handleSortChange = (e) => {
        this.setState({
            sort: e.target.value
        })
    }

    searchTask = (tasks) => {
        return tasks.filter(task => task.text.includes(this.state.search));
    }

    sortFinished = (finished) => {
        const sortType = this.state.sort;
        if (sortType === 'dateDesc'){
            finished.sort((a, b) => {
                if (a.finishDate > b.finishDate) return -1
                if (a.finishDate < b.finishDate) return 1
                return 0
            })
        }
        else if (sortType === 'dateAsc'){
            finished.sort((a, b) => {
                if (a.finishDate < b.finishDate) return -1
                if (a.finishDate > b.finishDate) return 1
                return 0
            })
        }
        else if (sortType === 'nameDesc'){
            finished.sort((a, b) => {
                if (a.text > b.text) return -1
                if (a.text < b.text) return 1
                return 0
            })
        }
        else if (sortType === 'nameAsc'){
            finished.sort((a, b) => {
                if (a.text < b.text) return -1
                if (a.text > b.text) return 1
                return 0
            })
        }
        return finished;
    }


    render() {
        let unfinished = this.props.tasks.filter(task => parseInt(task.finishDate.slice(0,4))<2021)
        let finished = this.props.tasks.filter(task => parseInt(task.finishDate.slice(0,4))>=2021)
        unfinished = this.searchTask(unfinished)
        finished = this.sortFinished(finished)

        const unfinishedTasks = unfinished.map(task => {
                return <Task
                    key={task._id+(Math.random()*1000).toString()}
                    task={task}
                    finish={this.props.finish}
                    delete={this.props.delete}
                    handleColorChange={this.props.handleColorChange}
                />
        });
        const finishedTasks = finished.map(task => {
                return <FinishedTask key={task._id+(Math.random()*1000).toString()} task={task} delete={this.props.delete}/>
        });

        return (
            <div className='currentTask container'>
                <h2>Task to Do:</h2>
                <label htmlFor="search">
                    <input type="text" id="search" value={this.state.search} onChange={this.handleSearchChange} placeholder="Search Task"/>
                </label>
                <section className='unfinished row justify-content-center'>
                        {unfinishedTasks.length > 0 ? unfinishedTasks : <p className='message'>Currently you have no task to do with this search criteria, you can add one by filling in the form above</p>}
                </section>
                <section className='finished mt-3'>
                    <h3>Finished Tasks:</h3>
                    <label htmlFor="sort" className='mb-3'>Sort by
                        <select name="sort" id="sort" onChange={this.handleSortChange}>
                            <option value="dateDesc">Finish date descending</option>
                            <option value="dateAsc">Finish date ascending</option>
                            <option value="nameDesc">Description descending</option>
                            <option value="nameAsc">Description ascending</option>
                        </select>
                    </label>
                    {finishedTasks.length > 0 ? finishedTasks : <p>Task history clean</p>}
                </section>
            </div>
        );
    }
};

export default TaskList;
