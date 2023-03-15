import {FilterType, TasksType} from "./App";
import {ChangeEvent} from "react";
import s from "./ToDolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EdittableSpan} from "./EdittableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TodoListPropsType = {
    IdTodolist: string,
    title: string
    task: TasksType
    filterHandler: (IdTodolist: string, filterWord: FilterType) => void
    deleteTask: (IdTodolist: string, id: string) => void
    addTask: (IdTodolist: string, title: string) => void
    changeCheked: (IdTodolist: string, idTask: string, newIsDone: boolean) => void
    filterValue: FilterType,
    deleteTodoList: (IdTodolist: string) => void,
}

export const TodoList = (props: TodoListPropsType) => {

    const onClickFilterHadler = (filterWord: FilterType) => {
        props.filterHandler(props.IdTodolist, filterWord)
    }

    const changeChekedHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeCheked(props.IdTodolist, id, e.currentTarget.checked)
    }

    const addTask = (title: string) => {
        props.addTask(props.IdTodolist, title)
    }
    const deleteTodolist = () => {

        props.deleteTodoList(props.IdTodolist)
    }

    return (
        <div>
            <div className={s.title}>
                <EdittableSpan title={props.title}/>
                <IconButton onClick={() => deleteTodolist()} aria-label="delete">
                    <Delete/>
                </IconButton>
            </div>
            <div>
                <AddItemForm addItem={addTask}/>

                    {props.task.map(t => {
                        return (
                            <div key={t.id} className={t.isDone ? s.completed : ''}>
                                <Checkbox onChange={(e) => changeChekedHandler(e, t.id)}
                                          checked={t.isDone}/>
                                <EdittableSpan title={t.title}/>

                                <IconButton onClick={() => {
                                    props.deleteTask(props.IdTodolist, t.id)
                                }}
                                            aria-label="delete">
                                    <Delete/>
                                </IconButton>
                            </div>
                        )
                    })}

                <div>
                    <ButtonGroup variant="text" aria-label="outlined primary button group">
                    <Button variant={props.filterValue === 'all' ? 'contained' : 'text'}
                            onClick={() => onClickFilterHadler('all')}>All
                    </Button>
                    <Button variant={props.filterValue === 'completed' ? 'contained' : 'text'}
                            onClick={() => onClickFilterHadler('completed')}>Completed
                    </Button>
                    <Button variant={props.filterValue === 'active' ? 'contained' : 'text'}
                            onClick={() => onClickFilterHadler('active')}>Active
                    </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}


