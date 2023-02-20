import {FilterType, TasksType} from "./App";

export type TodoListPropsType = {
    task: TasksType
    filterHandler:(filterWord:FilterType)=>void
}

export const TodoList = (props: TodoListPropsType) => {
    return (
        <>
            <div>
                <div><input/> {/*инпут для добавления новых тасок*/}
                    <button>+</button>
                </div>
                <ul>
                    {props.task.map(t=>{
                        return(
                            <li>
                                <button onClick={()=>{console.log('delet')}}>X</button>
                                {t.title}
                                <input type={"checkbox"} checked={t.isDone}/>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={()=>props.filterHandler('all')}>All</button>
                    <button onClick={()=>props.filterHandler('completed')}>Completed</button>
                    <button onClick={()=>props.filterHandler('active')}>Active</button>
                </div>
            </div>
        </>
    )
}