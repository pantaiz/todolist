import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
    let [tasks, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: string) {
        setTask(tasks.filter((v) => v.id != id))
    }

    function filterTask(value: FilterValuesType) {
        setFilter(value)
    }
    function addNewTask(item:string) {
        setTask([...tasksForToDoList,{id: v1(), title: item, isDone: false}])
    }

    let tasksForToDoList = tasks

    if (filter === 'active') {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }
    return (
        <div className="App">
            <TodoList removeTask={removeTask}
                      task={tasksForToDoList}
                      filterTask={filterTask}
                      addNewTask={addNewTask}

            />

        </div>
    );
}

export default App;