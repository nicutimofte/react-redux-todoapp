import 'babel-polyfill'

// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");
// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App.jsx'
import { createStore } from 'redux';
import todoApp from './reducers/todoApp.jsx'
const store = createStore(todoApp);
import * as TodoActions from './actions/index.jsx'

render(
    <Provider store={store}>
        <App actions={TodoActions} todos={store.getState().todos}   />
    </Provider>,
    document.getElementById('react-root')
);

