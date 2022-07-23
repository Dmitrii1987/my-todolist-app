import React, { ChangeEvent, KeyboardEvent, useState } from "react";
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

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: PropsType) => {

    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todolistId, title.trim())
            setTitle("")
        } else {
            setError("Title is requaried!")
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
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
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? "error" : ""} />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
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
                {/* <li> сверху тоже самое, но с помощью метода массива map
                    <input type="checkbox" checked={props.tasks[0].isDone} />
                    <span>{props.tasks[0].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[1].isDone} />
                    <span>{props.tasks[1].title}</span>
                </li>
                <li>
                    <input type="checkbox" checked={props.tasks[2].isDone} />
                    <span>{props.tasks[2].title}</span>
                </li> */}
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