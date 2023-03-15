import { TextField } from "@mui/material";
import React, {useState,ChangeEvent} from "react";

export type EdittableSpanPropsType = {
    title: string
}
export const EdittableSpan = (props: EdittableSpanPropsType) => {

    const [change, setChange] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onDubleClickHandler = () => {
        setChange(true)
    }

    const onBlurHandler = () => {
        setChange(false)

    }

    return change
        ? <TextField  size="small" variant="standard" onBlur={onBlurHandler} onChange={onChangeInputHandler} value={title}/>
        : <span onDoubleClick={onDubleClickHandler} >{title}</span>
}