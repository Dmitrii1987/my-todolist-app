import { log } from 'console';
import React, { useState } from 'react';
import './App.css';
import Todolist from './Todolist';

function App() {

    let [tasks,setTasks] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ])

    //const removeTask = (id:number)=> {tasks = tasks.filter((task)=> task.id !==id)}

    const removeTask = (id:number)=> { // непонятно. нужно понять
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }
    
    return (
        <div className="App">
            <Todolist title='What to learn'
            tasks={tasks}
            removeTask={removeTask} />
        </div>
    );
}

export default App;
