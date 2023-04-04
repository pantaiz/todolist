import { v1 } from "uuid";
import {FilterValuesType, TasksStateType, TodolistType} from "../App";
export type removeTaskACType={
    type:'REMOVE-TASK'
    todolistId:string
    taskID:string

}
export type addTaskACType={
    type:"ADD-TASK",
    title:string
    todolistId:string
}



const startState:TasksStateType={
    "todolistId1": [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    "todolistId2": [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export type ActionType = removeTaskACType|addTaskACType

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const tasksReducer = (state: TasksStateType, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,
            [action.todolistId]:state[action.todolistId].filter(t=>t.id!=action.taskID)
            }
        case "ADD-TASK":
            return {...state,
                [action.todolistId]:[...state[action.todolistId],{id:v1(),title:action.title,isDone:false}]
            }

        default:
            throw new Error('I don\'t understand this type')
    }
}
export const removeTaskAC = (todolistId: string,taskID:string): removeTaskACType => {
    return {type: 'REMOVE-TASK', todolistId, taskID}
}
export const addTaskAC = (todolistId: string,title: string): addTaskACType => {
    return {type: "ADD-TASK",todolistId, title}
}
