import {combineReducers, createStore } from "redux";
import { tasksReducer } from "./task-reducer";
import { todolistsReducer } from "./todolist-reducer";

const RootReducer=combineReducers({
    todolist:todolistsReducer,
    task:tasksReducer
})

export type AppRootStateType=ReturnType<typeof RootReducer>
export const store=createStore(RootReducer)