import React, { ChangeEvent, useState } from 'react';

type EditableSpanType = {
    value: string
    onChange:(newValue:string)=>void
}

const EditableSpan = (props: EditableSpanType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const[title, setTitle] = useState(props.value)


    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.value)
    }
    const activateViewMode = ()=> {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
        setTitle(e.currentTarget.value)
    }

    return editMode 
    ? <input onChange={onChangeHandler} value={props.value} onBlur={activateViewMode} autoFocus /> 
    : <span onDoubleClick={activateEditMode} >{props.value}</span>
    
};

export default EditableSpan;