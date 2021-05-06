import React, {Component} from 'react';
import '../stylesheets/AddTask.sass'

class AddTask extends Component {
    state = {
        text: '',
        important: false,
        deadline: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
        textError: false
    }
    handleDescriptionChange = (e) => {
        this.setState({
            textError: false,
            text: e.target.value
        })
    }
    handleCheckboxChange = (e) => {
        this.setState({
            important: e.target.checked,
        })
    }
    handleDate = (e) => {
        this.setState({
            deadline: e.target.value
        })
    }
    handleSubmitTask = (e) => {
        e.preventDefault()
        const {text, important, deadline} = this.state;
        if(!text){
            this.setState({
                textError: true
            })
            return;
        }
        this.props.addTask(text, important, deadline)
        this.setState({
            text: '',
            important: false,
            deadline: new Date().toISOString().slice(0,10),
        })
    }
    render() {
        return (
            <div className='toDoList container'>
                <form className='row' onSubmit={this.handleSubmitTask}>

                    <div className='col-md-4'>
                        <label htmlFor="important">Important</label>
                        <input type="checkbox" id="important" checked={this.state.important} onChange={this.handleCheckboxChange}/>
                    </div>

                    <div className='col-md-4'>
                        <label htmlFor="text">Task description</label>
                        <input type="text" id="text" value={this.state.text} onChange={this.handleDescriptionChange} placeholder={this.state.textError ? `Don't add empty task` : undefined}/>
                    </div>

                    <div className='col-md-4'>
                        <label htmlFor="deadline">Deadline</label>
                        <input type="date" id="deadline" value={this.state.deadline} onChange={this.handleDate} min={new Date().toISOString().slice(0,10)} max='2026-01-31'/>
                    </div>

                    <div className='col-8 offset-2 mt-4 col-md-2 offset-md-5 mt-md-1'>
                        <button>Add</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddTask;