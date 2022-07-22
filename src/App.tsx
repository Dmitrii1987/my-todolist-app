import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import Todolist from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    })


    const addTask = (title: string) => {
        let task = { id: v1(), title: title, isDone: false }
        let newTasks = [task, ...tasks] // нужно, чтобы объяснили
        setTasks(newTasks)
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {  // непонятно
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    const removeTask = (todolistId: string, id: string) => { 
        tasks[todolistId].filter(el=>el.id !== id)
        setTasks({...tasks})

        //  или вот так
        //setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    }


    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            {
                todolists.map(todolist => {
                    let tasksForTodolist = tasks // здесь храним отфильтрованные таски
                    if (todolist.filter === 'active') {
                        tasksForTodolist = tasks.filter(task => task.isDone === false)
                    }
                    if (todolist.filter === 'completed') {
                        tasksForTodolist = tasks.filter(task => task.isDone === true)
                    }
                    return (
                        <Todolist
                            key={todolist.id}
                            todolistId={todolist.id}
                            title={todolist.title}
                            tasks={tasksForTodolist}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            filter={todolist.filter} />
                    )
                })
            }
        </div>
    );
}

export default App;
