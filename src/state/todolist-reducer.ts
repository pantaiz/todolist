import { v1 } from "uuid";
import {FilterValuesType, TodolistType} from "../App";
export type removeTodolistType={
    type:"REMOVE-TODOLIST",
    id:string
}
export type addTodolistType={
    type:"ADD-TODOLIST",
    title:string
    todolistId:string
}
export type ChangeTodolistTitleType={
    type:"CHANGE-TODOLIST-TITLE",
    id:string,
    newTitle:string
}
export type ChangeTodolistFilterType={
    type:"CHANGE-TODOLIST-FILTER",
    id:string
    filter:FilterValuesType
}
export type ActionType = ChangeTodolistTitleType|addTodolistType|removeTodolistType|ChangeTodolistFilterType

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(a=>a.id!=action.id)
        case 'ADD-TODOLIST':
            return [{id:action.todolistId, title: action.title, filter: 'all'}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.id?{...tl,title:action.newTitle}:tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.id?{...tl,filter:action.filter}:tl)
        default:
            throw new Error('I don\'t understand this type')
    }
}
export const RemoveTodolistAC = (todolistId: string): removeTodolistType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string):addTodolistType  => {
    return {type: "ADD-TODOLIST",todolistId:v1(),title:title }
}
export const ChangeTodolistTitleAC = (id:string, newTitle: string):ChangeTodolistTitleType  => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: id,
        newTitle: newTitle
    }
}
export const ChangeTodolistFilterAC = (id:string, filter: FilterValuesType):ChangeTodolistFilterType  => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: id,
        filter: filter
    }
}



//addTD
//changeTDFILTR
