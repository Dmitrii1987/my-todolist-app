import { AppBar, Box, Button, Container, Grid, IconButton, Menu, Paper, Toolbar, Typography } from '@mui/material';
import React, { useReducer, useState } from 'react';
import { v1 } from 'uuid';
import AddItemForm from './AddItemForm';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';
import Todolist, { TaskType } from './Todolist';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './reducers/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './reducers/tasks-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useDispatch } from 'react-redux';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType,Array<TodolistsType>>(state=>state.todolists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state=>state.tasks)
    const dispatch=useDispatch()

    const editTodolist = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId,newTitle))
    }
    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    }


    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }

    const removeTask = (todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)

    }


    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }


    const addTodolist = (newTitle: string) => {
        const action = addTodolistAC(newTitle)
        dispatch(action)
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
                            return <Grid item key={el.id}>
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

export default AppWithRedux;
