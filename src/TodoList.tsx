import React from "react";

type PropsType={
    shapka?:string,
    shapka2?:string,
    task:Array<TaskType>
}
type TaskType={
    id:number,
    title:string
    isDone:boolean
}


export  const TodoList = (props:PropsType) => {
return  (
    <div>
        <h3>{props.shapka}</h3>
        <h3>{props.shapka2}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
        {props.task.map(value => {
            return(
                <li key={value.id}><input type="checkbox" checked={value.isDone}/> <span>{value.title}</span></li>

            )
        })}
    </ul>
        {/*
            <li><input type="checkbox" checked={props.task[1].isDone}/> <span>{props.task[1].title}</span></li>
            <li><input type="checkbox" checked={props.task[2].isDone}/> <span>{props.task[2].title}</span></li>
        */}
        <div>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    </div>
)
}

