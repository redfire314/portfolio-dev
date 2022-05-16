import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Theme from './assets/themes/default';

ReactDOM.render(
    <React.StrictMode>
        <Theme />
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
