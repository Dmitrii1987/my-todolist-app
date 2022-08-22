import { title } from 'process';
import { v1 } from "uuid"
import { FilterValuesType, TodolistsType } from "../App"



export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(el=>el.id!== action.payload.todolistId1)
        }
        case "ADD-TODOLIST" : {
            let newTodolist:TodolistsType = {id:action.todolistId,title:action.newTodolistTitle,filter:"all"}
            return [...state,newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId2 ? {...el,title:action.payload.newTodolistTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el =>el.id === action.payload.todolistId2 ? {...el,filter:action.payload.newFilter} : el)
        }
        default:
            return state
    }
}


type ActionsType = RemoveTodolistACType | AddTodolistACType 
| ChangeTodolistTitleACType | ChangeTodolistFilterACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type AddTodolistACType = {type:'ADD-TODOLIST',newTodolistTitle:string,todolistId:string}
type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: { todolistId1 }
    } as const
}

export const addTodolistAC=(newTodolistTitle:string)=>{
    return {
        type: 'ADD-TODOLIST',newTodolistTitle,todolistId:v1()
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