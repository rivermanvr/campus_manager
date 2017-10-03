import { GOT_NEW_DATA, GOT_SINGLE_STUDENT } from '../actions';

const initialState = {
  students: [],
  selectedStudent: {},
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GOT_NEW_DATA:
      return Object.assign({}, state, { students: action.payload.students });
    case GOT_SINGLE_STUDENT:
      return Object.assign({}, state, { selectedStudent: action.payload });
    default:
      return state;
  }
};
