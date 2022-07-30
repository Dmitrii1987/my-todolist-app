import {Delete } from "@mui/icons-material";
import { Button, Checkbox, IconButton } from "@mui/material";
import React, { ChangeEvent} from "react";
import AddItemForm from "./AddItemForm";
import { FilterValuesType } from "./App";
import EditableSpan from "./EditableSpan";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTodolist:(todolistId: string)=> void
    filter: FilterValuesType
    todolistId: string
    editTask:(todolistId:string,taskId:string,newTitle:string)=>void
    editTodolist:(todolistId: string,newTitle:string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: PropsType) => {

    
    // const addTask = (title:string) => {

    //     props.addTask(props.todolistId,title)
    // }


    const onAllClickHandler = () => props.changeFilter(props.todolistId, 'all')  // {} не обязательно?
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, 'completed')
    const removeTodolistHandler = ()=> props.removeTodolist(props.todolistId)

    const editTodolistHandler = (title:string) => {
        props.editTodolist(props.todolistId,title)
    }
    const editTaskHandler = (taskId:string, title:string)=> {
        props.editTask(props.todolistId,taskId,title)
    }
    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)  // id всегда на первом месте!!!!!!!
    }
    

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={editTodolistHandler} />
                <IconButton onClick={removeTodolistHandler} > <Delete fontSize="inherit" /> </IconButton>
            </h3>
            <div>
            <AddItemForm addItem={addTaskHandler} />
            </div>
            <div>
                {props.tasks.map((task) => { // спросить про эту запись!!!!

                    const onClickHandler = () => props.removeTask(props.todolistId, task.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(props.todolistId, task.id, newIsDoneValue) // непонятно ничего )
                    }

                    return (

                        <div key={task.id} className={task.isDone ? "is-done" : ""} >
                            <Checkbox color="primary" checked={task.isDone} onChange={onChangeHandler} />
                            <EditableSpan title = {task.title} onChange={(title)=> editTaskHandler(task.id,title)} />
                            <IconButton onClick={onClickHandler} > <Delete fontSize="small" /> </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                    onClick={onAllClickHandler} color='inherit'  >All</Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                    onClick={onActiveClickHandler} color='info'  >Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"} 
                 onClick={onCompletedClickHandler} color='secondary' >Completed</Button>
            </div>
        </div>
    )
}

export default Todolist