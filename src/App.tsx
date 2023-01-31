import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
export type FilterValuesType="all"|"active"|"completed";

function App() {
    let [tasks, setTask] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(id: number) {
        setTask(tasks.filter((v) => v.id != id))
        console.log(tasks);
    }

    function filterTask(value:FilterValuesType) {
            setFilter(value)}
    let tasksForToDoList=tasks

    if (filter==='active'){
        console.log("+")
        tasksForToDoList=tasks.filter(t=>t.isDone===false)
    }
    if (filter==='completed'){
        tasksForToDoList=tasks.filter(t=>t.isDone===true)
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