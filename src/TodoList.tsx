import {FilterType, TasksType} from "./App";
import {ChangeEvent,KeyboardEvent, useState} from "react";
import s from "./ToDolist.module.css"

export type TodoListPropsType = {
    task: TasksType
    filterHandler: (filterWord: FilterType) => void
    deleteTask: (id: string) => void
    addTask:(title:string)=>void
    changeCheked:(idTask:string,newIsDone:boolean)=>void

}

export const TodoList = (props: TodoListPropsType) => {
    const addNewTaskONcLICKHandler = () => {
        if (title){
            setError(false)
            props.addTask(title)
            setTitle('')
        }else{
            setError(true)
        }

    }
    const [title,setTitle]=useState<string>('')
    const [error,setError]=useState<boolean>(false)
    const onClickFilterHadler = (filterWord: FilterType) => {
        props.filterHandler(filterWord)
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
        props.changeCheked(id,e.currentTarget.checked)
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
                            <li key={t.id}>
                                <button onClick={() => {
                                    props.deleteTask(t.id)
                                }}>X
                                </button>
                                {t.title}
                                <input type={"checkbox"} onChange={(e)=>changeChekedHandler(e,t.id)} checked={t.isDone}/>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={() => onClickFilterHadler('all')}>All</button>
                    <button onClick={() => onClickFilterHadler('completed')}>Completed</button>
                    <button onClick={() => onClickFilterHadler('active')}>Active</button>
                </div>
            </div>
        </>
    )
}