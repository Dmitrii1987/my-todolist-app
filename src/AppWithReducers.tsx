import { AppBar, Box, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography } from '@mui/material';
import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './reducers/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './reducers/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    })

    const editTodolist = (todolistId: string, newTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId,newTitle))
    }
    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, newTitle))
    }


    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, id, isDone))
    }

    const removeTask = (todolistId: string, id: string) => {
        dispatchToTasks(removeTaskAC(todolistId, id))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }


    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, value))
    }


    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
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

export default AppWithReducers;
