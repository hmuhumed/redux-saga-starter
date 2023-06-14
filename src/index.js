import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { call, put, takeEvery } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';

const firstReducer = (state = 0, action) => {
    if (action.type === 'BUTTON_ONE') {
        console.log('firstReducer state', state);
        console.log('Button 1 was clicked!');
        return state + 1;
    }
    return state;
};

const secondReducer = (state = 100, action) => {
    if (action.type === 'BUTTON_TWO') {
        console.log('secondReducer state', state);
        console.log('Button 2 was clicked!');
        return state - 1;
    }
    return state;
};

const elementListReducer = (state = [], action) => {
    // if (action.type === 'ADD_ELEMENT') {
    //     console.log(`The element was ${action.payload}`);
    // }
    switch (action.type) {
        // case 'ADD_ELEMENT':
        //     return [ ...state, action.payload ];
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
};

function* postElement(action) {
    try {
        yield call(axios.post, '/api/element', action.payload);
        yield put({ type: 'FETCH_ELEMENTS' });
    } catch (error) {
        console.log('error posting an element', error);
    }    
}

function* fetchElements() {
    try {
        const elementsResponse = yield call(axios.get, '/api/element');
        yield put({ type: 'SET_ELEMENTS', payload: elementsResponse.data });
    } catch (error) {
        console.log('error fetching elements', error);
    }
}

function* elementSaga() {
    yield takeEvery('FETCH_ELEMENTS', fetchElements);
    yield takeEvery('ADD_ELEMENT', postElement);
}

const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        firstReducer,
        secondReducer,
        elementListReducer,
    }),
    applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(elementSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
