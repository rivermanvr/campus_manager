import { GOT_NEW_DATA } from '../actions';

const initialState = {
  students: [],
  selectedStudent: {},
  studentCampus: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GOT_NEW_DATA:
      return Object.assign({}, state, { students: action.payload.students });
    default:
      return state;
  }
};
