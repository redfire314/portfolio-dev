import React from 'react';
import { useNavigate } from 'react-router-dom';

import { TaskContext } from './Tasks';

const Task = (props) => {
    const tasks = React.useContext(TaskContext);
    const navigate = useNavigate();

    const handleTitleClick = () => {
        const updatedTasks = tasks.get.map((task) => {
            if (task === props.task) task.completed = !task.completed;

            return task;
        });

        tasks.set(updatedTasks);
    };

    const handleDetailsClick = () => {
        navigate(`/${props.task.title}`);
    };

    const handleDeleteClick = () => {
        const newTasks = tasks.get.filter((tk) => tk.id !== props.task.id);
        tasks.set(newTasks);
    };

    return (
        <div className={props.task.completed ? 'task done' : 'task'}>
            <div className='title' onClick={handleTitleClick}>
                {props.task.title}
            </div>
            <div>
                <button onClick={handleDetailsClick}>i</button>
                <button onClick={handleDeleteClick}>X</button>
            </div>
        </div>
    );
};

export default Task;
