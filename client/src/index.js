import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

let initialState = {};
const persistedStated = localStorage.getItem('state');

if(persistedStated) 
    initialState = JSON.parse(persistedStated);

let store = createStore(reducers, initialState, applyMiddleware(ReduxPromise, reduxThunk));

store.subscribe(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()));
});

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);