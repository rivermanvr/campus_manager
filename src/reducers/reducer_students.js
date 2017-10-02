const initialState = {
  students: [],
  selectedStudent: {},
  studentCampus: {}
}

export default (state = initialState, action) => {
  console.log('in reducer_students: ', state, action);
  return state;
};
