import React from "react";
import { FilterValuesType } from "./App";

type PropsType={

    task:Array<TaskType>
    removeTask:(id:string)=>void
    filterTask:(value:FilterValuesType)=>void
}
export type TaskType = {
    id: string,
    title: string
    isDone: boolean

}


export const TodoList = (props: PropsType) => {

    return (
        <div>
            <h3>dfg</h3>
            <h3>dfg</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.task.map(value => {
                    return (
                        <li key={value.id}><input type="checkbox" checked={value.isDone}/> <span>{value.title}</span>
                            <button onClick={()=> props.removeTask(value.id)}>X</button>
                        </li>)
                })}
            </ul>
            {/*
            <li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].title}</span></li>
            <li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].title}</span></li>
        */}
            <div>
                <button onClick={()=>{props.filterTask("all")}}>All</button>
                <button onClick={()=>{props.filterTask("active")}}>Active</button>
                <button onClick={()=>{props.filterTask("completed")}}>Completed</button>
            </div>
        </div>
    )
}


