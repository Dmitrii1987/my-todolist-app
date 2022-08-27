import { title } from 'process';
import { v1 } from "uuid"
import { FilterValuesType, TodolistsType } from "../App"

const initialState: Array<TodolistsType>=[]

export const todolistsReducer = (state=initialState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return state.filter(el=>el.id!== action.payload.todolistId1)
        }
        case "ADD-TODOLIST" : {
            let newTodolist:TodolistsType = {id:action.todolistId,title:action.newTodolistTitle,filter:"all"}
            return [newTodolist, ...state,]
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

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
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
        type: 'ADD-TODOLIST',todolistId:v1(),newTodolistTitle // этот todolistId:v1() сгенерируется
        //при добавлении тудулиста, а значит и пустого массива тасок для него
        // и при добавлении тасок
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