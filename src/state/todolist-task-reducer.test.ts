import { TasksStateType, TodolistType } from "../App"
import { tasksReducer } from "./task-reducer"
import { AddTodolistAC, todolistsReducer } from "./todolist-reducer"

test('new array should be added when new todolist is added', () => {
    const startTodolistState:Array<TodolistType>=[]
    const startTaskState: TasksStateType = {
 /*       'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]*/
    }

    const action = AddTodolistAC('new todolist')

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)


    const keys = Object.keys(endTaskState)
    const idFromTasks=keys[0]
    const idFromTodolists=endTodolistState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toBe(action.todolistId)
})
