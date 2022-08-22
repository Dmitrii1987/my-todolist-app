import { title } from 'process';
import { v1 } from "uuid"
import { FilterValuesType, TasksStateType, TodolistsType } from "../App"



export const tasksReducer = (state: TasksStateType, action: ActionsType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':{
            return {
                ...state,
                [action.todolistId]:state[action.todolistId]
                .filter(task=>task.id !== action.taskId)
            }
        }
        case 'ADD-TASK':{
            let task={id:v1(),title:action.title,isDone:false}
            return {
                ...state,
                [action.todolistId]:[task, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS':{
            return {
                ...state,
                [action.todolistId]:state[action.todolistId]
                .map(task=>task.id === action.taskId 
                    ? {...task,isDone: action.isDone}
                    :task)
            }
        }
        
        default:
            return state
    }
}


type ActionsType = RemoveTaskACType | AddTaskACType 
| ChangeTaskStatusACType | changeTodolistFilterACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTaskAC = (taskId:string,todolistId: string) => {
    return {
        type: 'REMOVE-TASK',taskId,todolistId
    } as const
}

export const addTaskAC=(title:string,todolistId:string)=>{
    return {
        type: 'ADD-TASK',title,todolistId
    } as const
}

export const changeTaskStatusAC=(taskId:string,isDone:boolean, todolistId:string)=>{
    return {
        type: 'CHANGE-TASK-STATUS',taskId,isDone,todolistId
    } as const
}

export const changeTodolistFilterAC=(todolistId2:string,newFilter:FilterValuesType)=>{
    return {
        type:'CHANGE-TODOLIST-FILTER',
        payload:{todolistId2,newFilter}
    } as const
}