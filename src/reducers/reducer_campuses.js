import { GOT_NEW_DATA } from '../actions';

const initialState = {
  campuses: [],
  selectedCampus: {},
  campusStudents: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case GOT_NEW_DATA:
      return Object.assign({}, state, { campuses: action.payload.campuses });
    default:
      return state;
  }
};
