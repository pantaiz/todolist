import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    initialized: false as boolean
}
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, initialized: action.initialized}
        default:
            return state
    }
}
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const)

export const initializedAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))

            } else {
                handleServerAppError(res.data, dispatch);
            }
            dispatch(setAppInitializedAC(true))
        })
        .catch((e)=>{
            dispatch(setAppInitializedAC(true))
            handleServerNetworkError((e as any).message, dispatch);
        })
}

export type InitialStateType = typeof initialState
type ActionsType = setAppErrorType | setAppStatusType | setAppInitializedType
export type setAppErrorType = ReturnType<typeof setAppErrorAC>
export type setAppStatusType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedType = ReturnType<typeof setAppInitializedAC>
