import React from 'react';
import Title from './Title';
import Tasks from './Tasks';

const TodoTask = () => {
    return (
        <div className='todo-tasks'>
            <Title>Minhas Tarefas</Title>
            <Tasks />
        </div>
    );
};

export default TodoTask;
