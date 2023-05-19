import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from "redux";
import {RequestStatusType, setErrorType, setStatusAC, setStatusType} from "../../app/app-reducer";

const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all',entityStatus:'idle'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(todolist=>todolist.id===action.id?{...todolist,title:action.title}:todolist)
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(list => ({...list, filter: 'all',entityStatus:'idle'}));
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(todolist=>todolist.id===action.id?{...todolist,title:action.filter}:todolist)
        }
        default:
            return state;
    }
}

//actions
export const removeTodolistAC = (todolistId: string) => ( {type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.getTodolists().then(res => {
        let todos = res.data
        dispatch(setTodolistsAC(todos))
        dispatch(setStatusAC('succeeded'))
    })
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistsAPI.createTodolist(title).then(res => {
        const newToDo = res.data.data.item
        dispatch(addTodolistAC(newToDo))
        dispatch(setStatusAC('succeeded'))
    })
}
export const deleteTodolistsTC = (id: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(id).then(() => {
        dispatch(removeTodolistAC(id))
    })
}
export const updateTodolistsTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title).then(() => {
        dispatch(changeTodolistTitleAC(id, title))
    })
}

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | setStatusType
    | setErrorType
             //filters type
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus:RequestStatusType
}
