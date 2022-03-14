import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import Task from './Task';

export let TaskContext;

const Tasks = () => {
    let [taskData, setTaskData] = useState([
        {
            id: 1,
            title: 'Title',
            completed: true
        }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
            setTaskData(data.data);
        };

        fetchData();
    }, []);

    TaskContext = React.createContext({
        get: taskData,
        set: setTaskData
    });

    const taskList = taskData.map((task) => <Task key={task.id} task={task} />);

    return (
        <>
            <AddTask />
            {taskList}
        </>
    );
};

export default Tasks;
