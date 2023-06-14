// src/redux/sagas/index.js
// is responsible for loading all sagas, and merging them together

import { all } from 'redux-saga/effects';
import elementSagas from './elementsSaga';

// rootSaga
// The Primary thing to rule all sagas
// This will be imported in our index.js for our app

function* rootSaga() {
  yield all([
    // here are all the sagas together
    elementSagas()
  ])
}

export default rootSaga