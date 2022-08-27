import { title } from 'process';
import { v1 } from "uuid"
import { FilterValuesType, TasksStateType, TodolistsType } from "../App"
import { AddTodolistACType, RemoveTodolistACType } from './todolists-reducer';


const initialState:TasksStateType={}

export const tasksReducer = (state=initialState, action: ActionsType):TasksStateType => {
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
        case 'CHANGE-TASK-TITLE':{
            return {
                ...state,
                [action.todolistId]:state[action.todolistId]
                .map(task=>task.id === action.taskId
                    ? {...task,title:action.title}
                    :task)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.todolistId1]
            return copyState
        }
        
        default:
            return state
    }
}


type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType 
| ChangeTaskTitleACType | AddTodolistACType | RemoveTodolistACType


type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (todolistId: string,taskId:string) => {
    return {
        type: 'REMOVE-TASK',taskId,todolistId
    } as const
}

export const addTaskAC=(todolistId:string,title:string)=>{
    return {
        type: 'ADD-TASK',title,todolistId
    } as const
}

export const changeTaskStatusAC=(todolistId:string,taskId:string,isDone:boolean )=>{
    return {
        type: 'CHANGE-TASK-STATUS',todolistId,taskId,isDone
    } as const
}

export const changeTaskTitleAC=(todolistId:string,taskId:string,title:string,)=>{
    return {
        type:'CHANGE-TASK-TITLE',taskId,title,todolistId
    } as const
}