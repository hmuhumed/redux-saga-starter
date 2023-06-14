// src/redux/reducers/element.reducer.js
import { combineReducers } from 'redux';

//these probably should be in their own file
const firstReducer = (state = 0, action) => {
  if (action.type === 'BUTTON_ONE') {
    console.log('firstReducer state', state);
    console.log('Button 1 was clicked!');
    return state + 1;
  }
  return state;
};

//these probably should be in their own file
const secondReducer = (state = 100, action) => {
  if (action.type === 'BUTTON_TWO') {
    console.log('secondReducer state', state);
    console.log('Button 2 was clicked!');
    return state - 1;
  }
  return state;
};

const elementListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ELEMENTS':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  firstReducer,
  secondReducer,
  elementListReducer,
})

export default rootReducer