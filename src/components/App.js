
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../containers/NavBar';
import Campuses from '../containers/Campuses';
import Campus from '../containers/Campus';
import Students from '../containers/Students';
import Student from '../containers/Student'

export default class AppContainer extends Component {
  constructor() {
    super();
    this.state = { campuses: [], students: [] };

    this.getData = this.getData.bind(this);
    this.addCampus = this.addCampus.bind(this);
    this.removeCampus = this.removeCampus.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
    this.changeStudentCampus = this.changeStudentCampus.bind(this);
    this.updateCampus = this.updateCampus.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }

  // Will transition axios call into Thunk functions.........TODO.........

  getData() {
    Promise.all([
      axios.get('/api/campuses'),
      axios.get('/api/students')
    ])
    .then(results => {
      const campuses = results[0].data
      const students = results[1].data
      console.log('App.getData(campuses & students): ', campuses, students)
      this.setState({ students, campuses });
    })
  }

  componentDidMount() {
    this.getData();
  }

  addCampus(newCampus) {
    axios.post('api/campuses', newCampus)
      .then(() => this.getData());
  }

  removeCampus(id) {
    axios.delete(`api/campuses/${ id }`)
      .then(() => this.getData());
  }

  addStudent(newStudent) {
    axios.post('api/students', newStudent)
      .then(() => this.getData());
  }

  removeStudent(id) {
    axios.delete(`api/students/${ id }`)
      .then(() => this.getData());
  }

  changeStudentCampus(id) {
    axios.put(`api/students/${ id }/campus`)
      .then(() => this.getData());
  }

  updateCampus(campusChg) {
    const id = campusChg.campus.id;
    axios.put(`/api/campuses/${ id }`, campusChg)
      .then(() => this.getData())
  }

  updateStudent(studentChg) {
    const id = studentChg.student.id;
    axios.put(`/api/students/${ id }`, studentChg)
      .then(() => this.getData())
  }

  render () {
    const cLen = this.state.campuses.length;
    const sLen = this.state.students.length;
    const students = this.state.students;
    const campuses = this.state.campuses;
    return (
      <div className="container-fluid">
        <h3>Welcome to Campus-Manager</h3>
        <Route
          render={ (router) => <Navbar
            router={ router } sLen={ sLen } cLen={ cLen } /> }
        />
        <Switch>
        <Route
          exact path="/student" render={ () => <Students
            students={ students }
            campuses={ campuses }
            addStudent={ this.addStudent }
            removeStudent={ this.removeStudent }
          /> }
        />
        <Route
          path="/campus/:id" render={ (router) => <Campus
            router={ router }
            changeStudentCampus={ this.changeStudentCampus }
            updateCampus={ this.updateCampus }
          /> }
        />


        <Route
          path="/student/:id" render={ (router) => <Student
            router={ router }
            updateStudent={ this.updateStudent }
            campuses={ campuses }
          /> }
        />
        
        <Route
          path="/" render={ () => <Campuses
            addCampus={ this.addCampus }
            removeCampus={ this.removeCampus }
            /> }
        />
      </Switch>
      </div>
    )
  }
}
