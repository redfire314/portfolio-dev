import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store/configStore';

import Theme from './assets/themes/default';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Theme />
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
