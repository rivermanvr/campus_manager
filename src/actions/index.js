import axios from 'axios';

// ***** ACTION TYPES *****

export const GOT_NEW_DATA = 'GOT_NEW_DATA';
export const GOT_SINGLE_CAMPUS = 'GOT_SINGLE_CAMPUS';

// ***** THUNK & ACTION CREATORS *****

export function removeCampus(campusId) {
  return axios.delete(`/api/campuses/${ campusId }`)
  .then(() => fetchData())
}

export function addCampus(campusNew) {
  return axios.post('/api/campuses', campusNew)
  .then(() => fetchData())
}

export function fetchData() {
  return Promise.all([
    axios.get('/api/campuses'),
    axios.get('/api/students')
  ])
  .then(results => {
    const campuses = results[0].data
    const students = results[1].data
    return { type: GOT_NEW_DATA, payload: { students, campuses } };
  })
}

export function gotSingleCampus(campusId) {
  return axios.get(`/api/campuses/${ campusId }`)
  .then(res => res.data)
  .then(_campus => {
    const selectedCampus = _campus[0];
    return { type: GOT_SINGLE_CAMPUS, payload: selectedCampus };
  })
}

export function changeStudentCampus(id, campusId) {
  return axios.put(`/api/students/${ id }/campus`)
  .then(() => gotSingleCampus(campusId))
}

export function updateCampus(campusChg) {
    const campusId = campusChg.id;
    return axios.put(`/api/campuses/${ campusId }`, campusChg)
    .then(res => res.data)
    .then(campus => {
      console.log('returned campusInst', campus)
      return gotSingleCampus(campus.id)
    })
  }


// need to convert this.........TODO............

  // addStudent(newStudent) {
  //   axios.post('api/students', newStudent)
  // }

  // removeStudent(id) {
  //   axios.delete(`api/students/${ id }`)
  // }


  // updateStudent(studentChg) {
  //   const id = studentChg.student.id;
  //   axios.put(`/api/students/${ id }`, studentChg)
  // }