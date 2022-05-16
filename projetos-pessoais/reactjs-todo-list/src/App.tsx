import { useState } from 'react';

import Container from './components/Container';
import TodoController from './components/TodoController';
import Task from './components/Task';

function App() {
    const [tasks, setTasks] = useState<Array<string>>([]);

    const addTaskOnList = (newTask: string) => {
        if (newTask === '') return;

        setTasks((state) => [...state, newTask]);
    };

    const removeTaskOnList = (taskText: string) => {
        const isSure: boolean = window.confirm('Deseja realmente remover essa tarefa?');
        isSure && setTasks((state) => state.filter((task) => task !== taskText));
    };

    return (
        <Container>
            <h2>Tarefas</h2>
            <TodoController addTaskOnList={addTaskOnList} />
            <>
                {tasks.map((task, index) => {
                    return <Task key={index} text={task} removeAction={removeTaskOnList} />;
                })}
            </>
        </Container>
    );
}

export default App;
