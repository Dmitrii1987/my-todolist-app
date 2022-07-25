import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import AddItemForm from "./AddItemForm";
import { FilterValuesType } from "./App";

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
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: PropsType) => {

    
    const addTask = (title:string) => {

        props.addTask(title,props.todolistId)
    }


    const onAllClickHandler = () => props.changeFilter(props.todolistId, 'all')  // {} не обязательно?
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, 'active')
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, 'completed')
    const removeTodolistHandler = ()=> props.removeTodolist(props.todolistId)
    

    return (
        <div>
            <h3>
                {props.title}---
                <button onClick={removeTodolistHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.tasks.map((task) => { // спросить про эту запись!!!!

                    const onClickHandler = () => props.removeTask(props.todolistId, task.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(props.todolistId, task.id, newIsDoneValue) // непонятно ничего )
                    }

                    return (
                        <li key={task.id} className={task.isDone ? "is-done" : ""} >
                            <input type="checkbox" checked={task.isDone} onChange={onChangeHandler} />
                            <span>{task.title}</span>
                            <button onClick={onClickHandler} >x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist