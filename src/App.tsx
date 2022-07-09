import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist from './Todolist';



export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks,setTasks] = useState( [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
    ])

    const addTask = (title:string) => {
        let task = {id:v1(), title: title , isDone: false}
        let newTasks = [task, ...tasks] // нужно, чтобы объяснили
        setTasks(newTasks)
    }

    //const removeTask = (id:number)=> {tasks = tasks.filter((task)=> task.id !==id)}

    const removeTask = (id:string)=> { // непонятно. нужно понять
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist = tasks // здесь храним отфильтрованные таски
    if(filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }
    if(filter === 'completed') {
        tasksForTodolist = tasks.filter(task=> task.isDone === true)
    }

    const changeFilter = (value: FilterValuesType)=> {
        setFilter(value)
    }
    
    return (
        <div className="App">
            <Todolist title='What to learn'
            tasks={tasksForTodolist}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeFilter} />
        </div>
    );
}

export default App;
