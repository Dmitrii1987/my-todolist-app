import { AppBar, Box, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';
import Todolist, { TaskType } from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

    const editTodolist = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId ? { ...el, title: newTitle } : el))
    }
    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? { ...el, title: newTitle } : el) })
    }


    const addTask = (todolistId: string, title: string) => {
        let newTask = { id: v1(), title: title, isDone: false };
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
        // let task = { id: v1(), title: title, isDone: false }
        // let todolistTasks = tasks[todolistId]
        // tasks[todolistId] = [task, ...todolistTasks]
        // setTasks({ ...tasks })
        //  или вот так
        // setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] })
    }

    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        //так или вот так
        //  setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, isDone: isDone } : el) })

        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(el => el.id === id)
        if (task) {
            task.isDone = isDone
            setTasks({ ...tasks })
        }
    }

    const removeTask = (todolistId: string, id: string) => {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(el => el.id !== id)
        setTasks({ ...tasks })

        //  или вот так
        //setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
        setTasks({ ...tasks })

    }


    const changeFilter = (todolistId: string, value: FilterValuesType) => {

        // setTodolists(todolists.map(el => el.id === todolistId ? { ...el, filter: value } : el))
        // или вот так
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }


    const addTodolist = (newTitle: string) => {
        let newTodolistId = v1()
        let newTodolist: TodolistsType = { id: newTodolistId, title: newTitle, filter: 'all' }
        setTodolists([newTodolist, ...todolists])
        setTasks({ ...tasks, [newTodolistId]: [] })
    }

    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Todolist
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3} >
                    {
                        todolists.map((el) => {
                            let tasksForTodolist = tasks[el.id] // здесь храним отфильтрованные таски
                            if (el.filter === 'active') {
                                tasksForTodolist = tasks[el.id].filter(task => task.isDone === false)
                            }
                            if (el.filter === 'completed') {
                                tasksForTodolist = tasks[el.id].filter(task => task.isDone === true)
                            }
                            return <Grid item>
                                <Paper style={{ padding: '10px' }} >
                                    <Todolist
                                        key={el.id}
                                        todolistId={el.id}
                                        title={el.title}
                                        tasks={tasksForTodolist}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={el.filter}
                                        removeTodolist={removeTodolist}
                                        editTask={editTask}
                                        editTodolist={editTodolist}
                                    />
                                </Paper>

                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
