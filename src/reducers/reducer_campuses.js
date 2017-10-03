import { GOT_NEW_DATA, GOT_SINGLE_CAMPUS } from '../actions';

const initialState = {
  campuses: [],
  selectedCampus: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_NEW_DATA:
      return Object.assign({}, state, { campuses: action.payload.campuses });
    case GOT_SINGLE_CAMPUS:
      return Object.assign({}, state, { selectedCampus: action.payload });
    default:
      return state;
  }
};
