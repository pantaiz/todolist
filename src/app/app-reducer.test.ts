import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState:InitialStateType

beforeEach(()=>{
    startState= {
        error: null,
        status: 'idle',
        initialized: false
    }
})
test('correct error message should be set',()=>{
    const endState=appReducer(startState,setAppErrorAC('some error'))
    expect(endState.error).toBe('some error');

})
test('correct status should be set',()=>{
    const endState=appReducer(startState,setAppStatusAC("succeeded"))
    expect(endState.status).toBe('succeeded');

})

