import React, { useState } from 'react';

type EditableSpanType = {
    value: string
}

const EditableSpan = (props: EditableSpanType) => {

    const [mode,setMode] = useState<boolean>(false)

    const editMode = ()=> {
        if (activateEditMode()) {
            setMode(!mode)
        }
    }

    const activateEditMode = () => {
        setMode(!mode)
    }

    return editMode ? <input value={props.value}/> : <span onDoubleClick={activateEditMode} >{props.value}</span>
    
};

export default EditableSpan;