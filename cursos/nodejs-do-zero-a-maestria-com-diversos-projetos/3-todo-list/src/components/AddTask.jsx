import React from 'react';
import BtnTask from './BtnTask';

import { TaskContext } from './Tasks';

const AddTask = () => {
    const [inputData, setInputData] = React.useState('');
    const taskContext = React.useContext(TaskContext);

    const handleInputChange = (event) => {
        setInputData(event.target.value);
    };

    const handleBtnAction = () => {
        taskContext.set([
            ...taskContext.get,
            {
                id: Math.ceil(Math.random() * 100),
                title: inputData,
                completed: false
            }
        ]);

        setInputData('');
    };

    return (
        <>
            <input type='text' className='input-task' placeholder='O que você precisa fazer?' onChange={(e) => handleInputChange(e)} value={inputData} />
            <BtnTask action={handleBtnAction}>Adicionar</BtnTask>
        </>
    );
};

export default AddTask;
