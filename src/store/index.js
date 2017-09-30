import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';

const initialState = {};

const reducer = (state = initialState, action) => {
  return state;
}

const store = createStore(
  reducer, composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware()
  ))
);

export default store;
