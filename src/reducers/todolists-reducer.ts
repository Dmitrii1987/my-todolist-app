import { TodolistsType } from "../App"

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [{...state.filter(el=>el.id !== action.id)}]
        default:
            throw new Error("I don't know this action type")
    }
}