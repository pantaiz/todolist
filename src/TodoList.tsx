import {FilterType, TasksType} from "./App";
import {ChangeEvent} from "react";
import s from "./ToDolist.module.css"
import {AddItemForm} from "./AddItemForm";
import { EdittableSpan } from "./EdittableSpan";

export type TodoListPropsType = {
    IdTodolist: string,
    title: string
    task: TasksType
    filterHandler: (IdTodolist: string, filterWord: FilterType) => void
    deleteTask: (IdTodolist: string, id: string) => void
    addTask: (IdTodolist: string, title: string) => void
    changeCheked: (IdTodolist: string, idTask: string, newIsDone: boolean) => void
    filterValue: FilterType,
    deleteTodoList:(IdTodolist: string)=>void,
}

export const TodoList = (props: TodoListPropsType) => {

    const onClickFilterHadler = (filterWord: FilterType) => {
        props.filterHandler(props.IdTodolist, filterWord)
    }

    const changeChekedHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        props.changeCheked(props.IdTodolist, id, e.currentTarget.checked)
    }

    const addTask = (title:string) => {
      props.addTask(props.IdTodolist,title)
    }
    const deleteTodolist = () => {

        props.deleteTodoList(props.IdTodolist)
    }

    return (
        <div>
            <div className={s.title}>
                <EdittableSpan title={props.title}/>
                <button onClick={()=>deleteTodolist()}>x</button>
            </div>
            <div>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {props.task.map(t => {
                        return (
                            <li key={t.id} className={t.isDone ? s.completed : ''}>
                                <button onClick={() => {props.deleteTask(props.IdTodolist, t.id)}}>
                                    X
                                </button>
                                <EdittableSpan title={t.title}/>
                                <input type={"checkbox"} onChange={(e) => changeChekedHandler(e, t.id)}
                                       checked={t.isDone}/>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button className={props.filterValue === 'all' ? s.ActiveButton : ""}
                            onClick={() => onClickFilterHadler('all')}>All
                    </button>
                    <button className={props.filterValue === 'completed' ? s.ActiveButton : ""}
                            onClick={() => onClickFilterHadler('completed')}>Completed
                    </button>
                    <button className={props.filterValue === 'active' ? s.ActiveButton : ""}
                            onClick={() => onClickFilterHadler('active')}>Active
                    </button>
                </div>
            </div>
        </div>
    )
}


