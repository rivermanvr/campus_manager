import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import reducers from '../reducers';


const store = createStore(
  reducers, composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger()
  ))
);

export default store;
