
import { v1 } from 'uuid'
import { TodolistType } from '../App'
import {todolistsReducer} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be add', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const newTodolistTITLE='New TODO LIST TEST'

    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTITLE})

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTITLE)
})

