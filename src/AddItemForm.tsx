import {ChangeEvent, useState, KeyboardEvent} from "react";
import s from "./ToDolist.module.css";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTaskONcLICKHandler()
        }
    }
    const addNewTaskONcLICKHandler = () => {
        if (title) {
            setError(false)
            props.addItem(title)
            setTitle('')
        } else {
            setError(true)
        }

    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    return <>
        {error && <div className={s.errorMessage}>Wrong input messege!</div>}
        <div><input
            className={error ? s.error : ''}
            value={title}
            onKeyDown={onKeyDownHandler}
            onChange={onChangeInputHandler}/> {/*инпут для добавления новых тасок*/}
            <button onClick={addNewTaskONcLICKHandler}>+</button>
        </div>
    </>
}