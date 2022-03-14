import React from 'react';

const BtnTask = (props) => {
    return (
        <>
            <button className='btn-task' onClick={props.action}>
                {props.children}
            </button>
        </>
    );
};

export default BtnTask;
