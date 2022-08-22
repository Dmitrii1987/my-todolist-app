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
        
        default:
            return state
    }
}


type ActionsType = removeTaskACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTaskAC = (taskId:string,todolistId: string) => {
    return {
        type: 'REMOVE-TASK',taskId,todolistId
    } as const
}

export const addTodolistAC=(newTodolistTitle:string)=>{
    return {
        type: 'ADD-TODOLIST',
        payload:{newTodolistTitle}
    } as const
}

export const changeTodolistTitleAC=(todolistId2:string,newTodolistTitle:string)=>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload:{ todolistId2, newTodolistTitle,}
    } as const
}

export const changeTodolistFilterAC=(todolistId2:string,newFilter:FilterValuesType)=>{
    return {
        type:'CHANGE-TODOLIST-FILTER',
        payload:{todolistId2,newFilter}
    } as const
}