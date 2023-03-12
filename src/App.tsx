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
export type todolistType={
    id:string,
    title:string,
    filter:FilterType }
export type todolistsType=todolistType[]
export type FilterType = 'all' | 'active' | 'completed'
const todolistId1 = v1()
const todolistId2 = v1()

function App() {
    let [todolist,setTodolist ]= useState<todolistsType>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'active'}
    ])
    let [tasks, setTask] = useState<>(
        {
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}],
            [todolistId2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}]
        }
    )
    const deleteTask = (id: string) => {
        filtredTask = filtredTask.filter(t => t.id !== id)
        setTask(filtredTask)
    }
    const changeCheked = (idTask: string, newIsDone: boolean) => {
        setTask(tasks.map(a => a.id === idTask ? {...a, isDone: newIsDone} : a))
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTask([newTask, ...tasks])

    }
    const [filter, setFilter] = useState<FilterType>('all')

    let filtredTask = [...tasks]
    if (filter === "all") filtredTask = [...tasks]
    if (filter === "active") filtredTask = tasks.filter(t => !t.isDone)
    if (filter === "completed") filtredTask = (tasks.filter(t => t.isDone))


    return (
        <>

            <TodoList filterValue={filter} changeCheked={changeCheked} addTask={addTask} task={filtredTask}
                      filterHandler={setFilter} deleteTask={deleteTask}/>
        </>

    )
}

export default App;