import { combineReducers } from 'redux';
import CampusesReducer from './reducer_campuses';
import StudentsReducer from './reducer_students'

const rootReducer = combineReducers({
  campusesState: CampusesReducer,
  studentsState: StudentsReducer
});

export default rootReducer;
