import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
    addItem:(title:string)=>void
}

const AddItemForm = (props:AddItemFormPropsType) => {

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
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? "error" : ""} />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddItemForm;