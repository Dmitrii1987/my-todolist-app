import { TextField } from '@mui/material';
import { title } from 'process';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';

type EditableSpanType = {
    title: string
    onChange: (title: string) => void
}

const EditableSpan = (props: EditableSpanType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(props.title)

    // const addTask = () => {
    //     if (newTitle !== "") {
    //        props.onChange(newTitle);
    //     }
    // }

    const activateEditMode = () => {
        setEditMode(true)
        setNewTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(newTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        console.log(e.currentTarget.value);

    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setEditMode(false)
            props.onChange(newTitle)
        }
    }

    return editMode
        ? <TextField onKeyDown={onKeyDownHandler} size="small" variant='outlined' onChange={onChangeHandler} value={newTitle} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditMode} >{props.title}</span>

};

export default EditableSpan;