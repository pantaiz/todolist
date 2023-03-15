import { Add } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
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
        <div><TextField
            className={error ? s.error : ''}
            variant={'outlined'}
            label={'Type value'}
            error={!!error}
            helperText={error?'Wrong input messege!':''}

            value={title}
            onKeyDown={onKeyDownHandler}
            onChange={onChangeInputHandler}/> {/*инпут для добавления новых тасок*/}
            <IconButton
                    color={'primary'}
                    onClick={addNewTaskONcLICKHandler}><Add/></IconButton>
        </div>
    </>
}