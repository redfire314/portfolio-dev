import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TodoTasks from './components/TodoTasks';
import TaskDetails from './components/TaskDetails';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<TodoTasks />} />
            <Route path='/:taskTitle' element={<TaskDetails />} />
            <Route path='*' element={<h1>Página não encontrada</h1>} />
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);
