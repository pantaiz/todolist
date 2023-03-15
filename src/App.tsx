import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';

export type alltasksType = {
    [key: string]: Array<TaskType>
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
    const deleteTodoList = (IdTodolist: string) => {
        setTodolist(todolist.filter(el => el.id !== IdTodolist))
        // setAlltask({...alltasks, [IdTodolist]: alltasks[IdTodolist].filter(t => t.id !== id)})
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
    const addTodoList = (title: string) => {
        const newTodo: todolistType = {id: v1(), title: title, filter: 'all'}
        setTodolist([...todolist, newTodo])
        setAlltask({[newTodo.id]: [], ...alltasks})
    }

    return (
        <div className={'App'}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 4}}>
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>


                <Grid item style={{padding:'10px'}}>
                    <Typography variant="h6">Create new TodoList</Typography>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>


                <Grid spacing={3} container>
                    {todolist.map(el => {
                        let filtredTask = [...alltasks[el.id]]
                        if (el.filter === "all") filtredTask = [...alltasks[el.id]]
                        if (el.filter === "active") filtredTask = alltasks[el.id].filter(t => !t.isDone)
                        if (el.filter === "completed") filtredTask = (alltasks[el.id].filter(t => t.isDone))
                        return (
                            <Grid item>
                                <Paper style={{padding:'20px'}}>
                                <TodoList key={el.id}
                                          title={el.title}
                                          IdTodolist={el.id}
                                          filterValue={el.filter}
                                          changeCheked={changeCheked}
                                          addTask={addTask}
                                          task={filtredTask}
                                          filterHandler={setFilter}
                                          deleteTask={deleteTask}
                                          deleteTodoList={deleteTodoList}/>
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>

    )
}

export default App;