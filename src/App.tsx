import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";


export type TaskType={
    id:string,
    title:string
    isDone:boolean
}
export type TasksType=TaskType[]

export type FilterType='all'|'active'|'completed'

function App() {
    let [tasks, setTask] = useState<TasksType>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    const [filter,setFilter]=useState<FilterType>('all')

    let filtredTask=[...tasks]
    const filterHandler = (filterWord:FilterType) => {
      if (filterWord==='active'){
          filtredTask=[...tasks]
      }
    }
    return(
    <>

    <TodoList task={filtredTask} filterHandler={filterHandler}/>
    </>

    )
}

export default App;