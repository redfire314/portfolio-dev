import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Title from './Title';
import BtnTask from './BtnTask';
import { TaskContext } from './Tasks';

const TaskDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const taskContext = useContext(TaskContext);

    const currentTask = taskContext.get.filter((task) => {
        if (task.title === params.taskTitle) return task;
    });

    const handleBtnAction = () => {
        navigate('/');
    };

    return (
        <div className='todo-tasks'>
            <Title>Detalhes da Tarefa</Title>
            <BtnTask action={handleBtnAction}>Voltar</BtnTask>
            <div className='details-container'>
                <h2>{currentTask[0].title}</h2>
                <span>{currentTask[0].completed ? 'Finalizado' : 'Pendente'}</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, debitis.</p>
            </div>
        </div>
    );
};

export default TaskDetails;
