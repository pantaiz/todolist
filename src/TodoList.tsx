import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type PropsType = {

    task: Array<TaskType>
    removeTask: (id: string) => void
    filterTask: (value: FilterValuesType) => void
    addNewTask: (item: string) => void
}
export type TaskType = {
    id: string,
    title: string
    isDone: boolean

}


export const TodoList = (props: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const OnNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const OnClickPressHandler = () => {
        props.addNewTask(newTaskTitle)
        setNewTaskTitle("")

    }
    const OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addNewTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    return (
        <div>
            <div>
                <input value={newTaskTitle}
                       onChange={OnNewTitleChangeHandler}
                       onKeyPress={OnKeyPressHandler}/>
                <button onClick={OnClickPressHandler}
                >+
                </button>
            </div>
            <ul>
                {props.task.map(value => {
                    return (
                        <li key={value.id}><input type="checkbox" checked={value.isDone}/> <span>{value.title}</span>
                            <button onClick={() => props.removeTask(value.id)}>X</button>
                        </li>)
                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.filterTask("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.filterTask("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.filterTask("completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}


