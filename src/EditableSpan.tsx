import React, { ChangeEvent, useState } from 'react';

type EditableSpanType = {
    title: string
    onChange:(title:string)=>void
}

const EditableSpan = (props: EditableSpanType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const[newTitle, setNewTitle] = useState(props.title)

    const addTask = () => {
        if (newTitle !== "") {
           props.onChange(newTitle);
        }
    }

    const activateEditMode = () => {
        setEditMode(!editMode)
        setNewTitle(props.title)
    }
    const activateViewMode = ()=> {
        setEditMode(editMode)
        addTask()
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setNewTitle(e.currentTarget.value)
        console.log(e.currentTarget.value);
        
    }

    return editMode 
    ? <input onChange={onChangeHandler} value={props.title} onBlur={activateViewMode} autoFocus /> 
    : <span onDoubleClick={activateEditMode} >{props.title}</span>
    
};

export default EditableSpan;