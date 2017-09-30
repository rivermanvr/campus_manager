import { combineReducers } from 'redux';
import CampusesReducer from './reducer_campuses';
import StudentsReducer from './reducer_students'

const rootReducer = combineReducers({
  campuses: CampusesReducer,
  students: StudentsReducer
});

export default rootReducer;
