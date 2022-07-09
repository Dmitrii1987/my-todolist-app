import React, { useState } from "react";
import { FilterValuesType } from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(id:string)=>void
    changeFilter:(value: FilterValuesType)=> void
    addTask:(title:string)=>void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: PropsType) => {

    let [title, setTitle]=useState("")
    
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={(event)=>setTitle(event.currentTarget.value)} />
                <button onClick={()=>props.addTask(title)}>+</button>
            </div>
            <ul> {props.tasks.map((task) => { // спросить про эту запись!!!!
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} />
                        <span>{task.title}</span>
                        <button onClick={()=>{props.removeTask(task.id)}} >x</button>
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
                <button onClick={()=>{props.changeFilter('all')}}>All</button>
                <button onClick={()=>{props.changeFilter('active')}}>Active</button>
                <button onClick={()=>{props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist