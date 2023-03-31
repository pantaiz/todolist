import { v1 } from "uuid";
import {TodolistType} from "../App";

type ActionType = {
    type:  string
    [key: string]: any
    id?:string //remove
    title:string//add

}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(a=>a.id!=action.id)
        case 'ADD-TODOLIST':
            return [{id: v1(), title: action.title, filter: 'all'}, ...state]
        default:
            throw new Error('I don\'t understand this type')
    }
}


//addTD
//changeTDFILTR
