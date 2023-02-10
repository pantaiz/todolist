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
        console.log(tasks);
    }

    function filterTask(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForToDoList = tasks

    if (filter === 'active') {
        console.log("+")
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

            />

        </div>
    );
}

export default App;