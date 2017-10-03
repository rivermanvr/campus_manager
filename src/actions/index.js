import axios from 'axios';

// ***** ACTION TYPES *****

export const GOT_NEW_DATA = 'GOT_NEW_DATA';
export const GOT_SINGLE_CAMPUS = 'GOT_SINGLE_CAMPUS';
export const GOT_SINGLE_STUDENT = 'GOT_SINGLE_STUDENT';

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
    return gotSingleCampus(campus.id)
  })
}

export function removeStudent(id) {
  return axios.delete(`/api/students/${ id }`)
  .then(() => fetchData())
}

export function addStudent(newStudent) {
  return axios.post('/api/students', newStudent)
  .then(() => fetchData())
}

export function updateStudent(studentChg) {
  const id = studentChg.id;
  return axios.put(`/api/students/${ id }`, studentChg)
  .then(res => res.data)
  .then(student => {
    return gotSingleStudent(student.id);
  })
}

export function gotSingleStudent(id) {
  axios.get(`/api/students/${ id }`)
  .then(res => res.data)
  .then(_student => {
    const selectedStudent = _student[0];
    return { type: GOT_SINGLE_STUDENT, payload: selectedStudent };
  })
}


// getData() {
//   const id = this.props.router.match.params.id;
//   let student = {};
//   axios.get(`/api/students/${ id }`)
//     .then(res => res.data)
//     .then(_student => {
//       student = _student[0];
//       return axios.get(`/api/campuses/${ student.campusId }`)
//     })
//     .then(campus => {
//       this.setState({
//         student, campus, name: student.name, photo: student.photo.slice(87),
//         phone: student.phone, email: student.email, campusId: student.campusId, errorAdd: '' })
//     })

// }
