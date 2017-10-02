import axios from 'axios';

// ***** ACTION TYPES *****

export const GOT_NEW_DATA = 'GOT_NEW_DATA';
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
  return Promise.all([
    axios.get('/api/campuses'),
    axios.get('/api/students')
  ])
  .then(results => {
    const campuses = results[0].data
    const students = results[1].data
    console.log('in fetchData: ', students, campuses)
    return { type: GOT_NEW_DATA, payload: { students, campuses } };
  })
}


// need to convert this.........TODO............

  // addCampus(newCampus) {
  //   axios.post('api/campuses', newCampus)
  // }

  // removeCampus(id) {
  //   axios.delete(`api/campuses/${ id }`)
  // }

  // addStudent(newStudent) {
  //   axios.post('api/students', newStudent)
  // }

  // removeStudent(id) {
  //   axios.delete(`api/students/${ id }`)
  // }

  // changeStudentCampus(id) {
  //   axios.put(`api/students/${ id }/campus`)
  // }

  // updateCampus(campusChg) {
  //   const id = campusChg.campus.id;
  //   axios.put(`/api/campuses/${ id }`, campusChg)
  // }

  // updateStudent(studentChg) {
  //   const id = studentChg.student.id;
  //   axios.put(`/api/students/${ id }`, studentChg)
  // }