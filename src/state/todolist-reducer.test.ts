
import { v1 } from 'uuid'
import { TodolistType,FilterValuesType } from '../App'
import {removeTodolistType, todolistsReducer,addTodolistType,ChangeTodolistTitleType,ChangeTodolistFilterType} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const action:removeTodolistType={type: 'REMOVE-TODOLIST', id: todolistId1}
    const endState = todolistsReducer(startState,action )

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
const action:addTodolistType={type: 'ADD-TODOLIST', title: newTodolistTITLE}
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTITLE)
})

test('correct todolist should be add', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const newTodolistTitle="NEW TODO";
    const action:ChangeTodolistTitleType={
        type:"CHANGE-TODOLIST-TITLE",
        id:todolistId2,
        newTitle:newTodolistTitle
    }
    const endState = todolistsReducer(startState,action)

    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed',()=>{
    let todolistId1 = v1()
    let todolistId2 = v1()
    const newFilter:FilterValuesType='completed'
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'active'}
    ]
    const action:ChangeTodolistFilterType={
        type:"CHANGE-TODOLIST-FILTER",
        id:todolistId2,
        filter:newFilter
    }
    const endState = todolistsReducer(startState,action)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})