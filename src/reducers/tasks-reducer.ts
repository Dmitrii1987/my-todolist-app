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
        
        default:
            return state
    }
}


type ActionsType = RemoveTaskACType | AddTaskACType | changeTodolistTitleACType | changeTodolistFilterACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
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