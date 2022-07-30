import {IconButton, AddBox } from '@mui/icons-material';
import {TextField } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {


    let [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title)
            setTitle("")
        } else {
            setError("Title is requaried!")
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField
                variant='outlined'
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!error}
                label='Title'
                helperText={error} />
            <IconButton onClick={addItem} variant="contained" color="success">
                <AddBox />
            </IconButton>
        </div>
    );
};

export default AddItemForm;