import axios from 'axios';

// ***** ACTION TYPES *****

export const FETCH_DATA = 'FETCH_DATA';
export const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
export const ADD_CAMPUS = 'ADD_CAMPUS';

// ***** THUNK & ACTION CREATORS *****

export function removeCampus(campusId) {
  console.log('in campusRemove action: ', campusId)
  return { type: REMOVE_CAMPUS, payload: campusId };
}

export function addCampus(campusNew) {
  console.log('in campusAdd action: ', campusNew)
  return { type: ADD_CAMPUS, payload: campusNew };
}

export function fetchData() {
  Promise.all([
    axios.get('/api/campuses'),
    axios.get('/api/students')
  ])
  .then(results => {
    const campuses = results[0].data
    const students = results[1].data
    return { type: FETCH_DATA, payload: { students, campuses } };
  })
}
