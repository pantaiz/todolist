import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {
    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]
    const tasks2 = [
        { id: 1, title: "Hello world", isDone: true },
        { id: 2, title: "I am Happy", isDone: false },
        { id: 3, title: "Yo", isDone: false },
        { id: 4, title: "Yo", isDone: false }
    ]
    const shapka1='What to leadrn-1'
    const shapka11='What to leadrn-11111111111111111111111111'
    const shapka2='What to leadrn-2'
    const shapka22='What to leadrn-2222222222222222222222222222'
    return (
        <div className="App">
            <TodoList  task={tasks1} shapka2={shapka11}/>
            <TodoList task={tasks2} shapka={shapka2} shapka2={shapka22}/>

        </div>
    );
}

export default App;
