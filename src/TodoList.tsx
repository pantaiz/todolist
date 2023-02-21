import {FilterType, TasksType} from "./App";
import {useState} from "react";

export type TodoListPropsType = {
    task: TasksType
    filterHandler: (filterWord: FilterType) => void
    deleteTask: (id: string) => void
    addTask:(title:string)=>void

}

export const TodoList = (props: TodoListPropsType) => {
    const addNewTaskONcLICKHandler = () => {
      props.addTask(title)
    }
    const [title,setTitle]=useState('')
    const onClickFilterHadler = (filterWord: FilterType) => {
        props.filterHandler(filterWord)
    }
    return (
        <>
            <div>
                <div><input value={title} onChange={(e)=>setTitle(e.currentTarget.value)}/> {/*инпут для добавления новых тасок*/}
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
                                <input type={"checkbox"} checked={t.isDone}/>
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