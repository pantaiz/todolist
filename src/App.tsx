import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";


export type TaskType = {
    id: string,
    title: string
    isDone: boolean
}
export type TasksType = TaskType[]

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTask] = useState<TasksType>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
const deleteTask = (id:string) => {
    filtredTask=filtredTask.filter(t=>t.id!==id)
    setTask(filtredTask)
}
    const [filter, setFilter] = useState<FilterType>('all')

    let filtredTask = [...tasks]
    if (filter==="all")filtredTask = [...tasks]
    if (filter==="active")filtredTask = tasks.filter(t => !t.isDone)
    if (filter==="completed")filtredTask = (tasks.filter(t => t.isDone))



    return (
        <>

            <TodoList task={filtredTask} filterHandler={setFilter} deleteTask={deleteTask}/>
        </>

    )
}

export default App;