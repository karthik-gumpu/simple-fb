import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import Routes from './components/Routes';
import configureStore from './store/configureStore';

const initialState = {
    posts: [],
    comments: [],
}
const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        {Routes}
    </Provider>,
    document.getElementById('root')
);

