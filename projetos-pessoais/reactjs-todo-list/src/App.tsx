import { useState } from 'react';
import styled from 'styled-components';

import TodoController from './components/TodoController';
import Task from './components/Task';

const AppContainer = styled.div`
    max-width: 640px;
    margin: 1em auto;
    padding: 1em;
    border-radius: 12px;
    background: rgba(33, 33, 33, 0.2);
`;

function App() {
    const [tasks, setTasks] = useState<Array<string>>([]);

    const addTaskOnList = (newTask: string) => {
        if (newTask === '') return;

        setTasks((state) => [...state, newTask]);
    };

    const removeTaskOnList = (taskText: string) => {
        setTasks((state) => state.filter((task) => task !== taskText));
    };

    return (
        <AppContainer>
            <h2>Tarefas</h2>
            <TodoController addTaskOnList={addTaskOnList} />
            {tasks.map((task, index) => {
                return <Task key={index} text={task} removeAction={removeTaskOnList} />;
            })}
        </AppContainer>
    );
}

export default App;
