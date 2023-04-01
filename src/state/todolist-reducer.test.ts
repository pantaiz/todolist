import {v1} from 'uuid'
import {TodolistType, FilterValuesType} from '../App'
import {AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer} from "./todolist-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1));

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
    const newTodolistTITLE = 'New TODO LIST TEST'
    const endState = todolistsReducer(startState, AddTodolistAC(newTodolistTITLE))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTITLE)
})

test('correct todolist should be change title', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const newTodolistTitle = "NEW TODO";
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2,newTodolistTitle))

    expect(endState[1].title).toBe(newTodolistTitle)
})


test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    const newFilter: FilterValuesType = 'completed'
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'active'}
    ]
    const action = {
        type: "CHANGE-TODOLIST-FILTER" as const,
        id: todolistId2,
        filter: newFilter
    }
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2,newFilter))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})