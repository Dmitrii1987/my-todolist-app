import React from 'react';

type EditableSpanType = {
    value: string
}

const EditableSpan = (props: EditableSpanType) => {
    return (
        <span>
            {props.value}
        </span>
    );
};

export default EditableSpan;