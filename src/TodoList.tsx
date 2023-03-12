import {FilterType, TasksType} from "./App";
import {ChangeEvent,KeyboardEvent, useState} from "react";
import s from "./ToDolist.module.css"

export type TodoListPropsType = {
    IdTodolist:string,
    task: TasksType
    filterHandler: (IdTodolist:string,filterWord: FilterType) => void
    deleteTask: (IdTodolist:string,id: string) => void
    addTask:(IdTodolist:string,title:string)=>void
    changeCheked:(IdTodolist:string,idTask:string,newIsDone:boolean)=>void
    filterValue:FilterType
}

export const TodoList = (props: TodoListPropsType) => {
    const addNewTaskONcLICKHandler = () => {
        if (title){
            setError(false)
            props.addTask(props.IdTodolist,title)
            setTitle('')
        }else{
            setError(true)
        }

    }
    const [title,setTitle]=useState<string>('')
    const [error,setError]=useState<boolean>(false)
    const onClickFilterHadler = (filterWord: FilterType) => {
        props.filterHandler(props.IdTodolist,filterWord)
    }
    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key==='Enter'){
            addNewTaskONcLICKHandler()
        }
    }
    const changeChekedHandler = (e:ChangeEvent<HTMLInputElement>,id:string) => {
        props.changeCheked(props.IdTodolist,id,e.currentTarget.checked)
        console.log(e.currentTarget.checked)
    }
    return (
        <>
            <div>
                {error&&<div className={s.errorMessage}>Wrong input messege!</div>}
                <div><input
                    className={error?s.error:''}
                    value={title}
                    onKeyDown={onKeyDownHandler}
                    onChange={onChangeInputHandler}/> {/*инпут для добавления новых тасок*/}
                    <button onClick={addNewTaskONcLICKHandler}>+</button>
                </div>
                <ul>
                    {props.task.map(t => {
                        return (
                            <li key={t.id} className={t.isDone?s.completed:''}>
                                <button onClick={() => {
                                    props.deleteTask(props.IdTodolist,t.id)
                                }}>X
                                </button>
                                {t.title}
                                <input type={"checkbox"} onChange={(e)=>changeChekedHandler(e,t.id)} checked={t.isDone}/>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button className={props.filterValue==='all'?s.ActiveButton:""} onClick={() => onClickFilterHadler('all')}>All</button>
                    <button className={props.filterValue==='completed'?s.ActiveButton:""} onClick={() => onClickFilterHadler('completed')}>Completed</button>
                    <button className={props.filterValue==='active'?s.ActiveButton:""} onClick={() => onClickFilterHadler('active')}>Active</button>
                </div>
            </div>
        </>
    )
}