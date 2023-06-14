// src/redux/sagas/elements.saga.js
import { call, put as dispatch, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchElements() {
  try {
    console.log('first saga triggered!');
    // axios GET request
    const elementsResponse = yield call(axios.get, '/api/element');
    // Send response to Redux
    yield dispatch({ type: 'SET_ELEMENTS', payload: elementsResponse.data });
    console.log('end of FetchElements');
  } catch (error) {
    console.log(error);
  }
}

function* postElement(action) {
  try {
    console.log('here is action in postElement', action);
    // axios call, send data
    yield call(axios.post, '/api/element', action.payload);
    // trigger get
    yield dispatch({ type: 'FETCH_ELEMENTS' });
    console.log('end of PostElements');
  } catch (error) {
    console.log(error);
  }
}

//watches for actions
function* watcherSaga() {
  yield takeEvery('FETCH_ELEMENTS', fetchElements);
  yield takeEvery('ADD_ELEMENT', postElement);
}

export default watcherSaga