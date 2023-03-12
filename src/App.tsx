import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import { AddItemForm } from './AddItemForm';

export type alltasksType={
    [key:string]:Array<TaskType>
}

export type TaskType = {
    id: string,
    title: string
    isDone: boolean
}
export type TasksType = TaskType[]
export type todolistType = {
    id: string,
    title: string,
    filter: FilterType
}
export type FilterType = 'all' | 'active' | 'completed'
const todolistId1 = v1()
const todolistId2 = v1()

function App() {
    let [todolist, setTodolist] = useState<todolistType[]>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])
    let [alltasks, setAlltask] = useState<alltasksType>(
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
    const deleteTask = (IdTodolist: string, id: string) => {
        setAlltask({...alltasks, [IdTodolist]: alltasks[IdTodolist].filter(t => t.id !== id)})
    }
    const changeCheked = (IdTodolist: string, idTask: string, newIsDone: boolean) => {
        setAlltask({
            ...alltasks,
            [IdTodolist]: alltasks[IdTodolist].map(a => a.id === idTask ? {...a, isDone: newIsDone} : a)
        })

    }
    const addTask = (IdTodolist: string, title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setAlltask({...alltasks, [IdTodolist]: [newTask, ...alltasks[IdTodolist]]})

    }

    const setFilter = (IdTodolist: string, filterValue: FilterType) => {
        setTodolist(todolist.map(el => el.id === IdTodolist ? {...el, filter: filterValue} : el))
    }
    const addTodoList = (title:string) => {
        const newTodo:todolistType={id: v1(), title: title, filter: 'all'}
        setTodolist([...todolist,newTodo])
        setAlltask({[newTodo.id]:[],...alltasks})
    }

    return (
        <div className={'App'}>
            <AddItemForm addItem={addTodoList}/>
            {todolist.map(el => {

                let filtredTask = [...alltasks[el.id]]
                if (el.filter === "all") filtredTask = [...alltasks[el.id]]
                if (el.filter === "active") filtredTask = alltasks[el.id].filter(t => !t.isDone)
                if (el.filter === "completed") filtredTask = (alltasks[el.id].filter(t => t.isDone))
                return <TodoList key={el.id}
                                 title={el.title}
                                 IdTodolist={el.id}
                                 filterValue={el.filter}
                                 changeCheked={changeCheked}
                                 addTask={addTask}
                                 task={filtredTask}
                                 filterHandler={setFilter}
                                 deleteTask={deleteTask}/>
            })}

        </div>

    )
}

export default App;