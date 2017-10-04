import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { gotSingleStudent } from '../actions';


class Student extends Component {
  constructor() {
    super();
    this.state = {
      id: 0, name: '', photo: '', campusId: 0,
      phone: '', email: '', errorAdd: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount(){
    const id = this.props.router.match.params.id;
    this.props.gotSingleStudent(id)
    .then(() => {
      this.setState({
        id: this.props.selectedStudent.id,
        name: this.props.selectedStudent.name,
        photo: this.props.selectedStudent.photo.slice(15),
        phone: this.props.selectedStudent.phone,
        email: this.props.selectedStudent.email,
        campusId: this.props.selectedStudent.campusId,
        errorAdd: ''
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    //there is also: currentProps
    if (!nextProps.selectedStudent.id) return;
    this.setState({
      id: nextProps.selectedStudent.id,
      name: nextProps.selectedStudent.name,
      photo: nextProps.selectedStudent.photo.slice(15),
      phone: nextProps.selectedStudent.phone,
      email: nextProps.selectedStudent.email,
      campusId: nextProps.selectedStudent.campusId,
      errorAdd: ''
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name && this.state.email ) {
      const studentChg = this.state;
      studentChg.photo = this.state.student.photo;
      this.props.updateStudent(studentChg);
    } else {
      this.setState({
        errorAdd: 'The name & email fields are required',
        name: this.state.student.name,
        email: this.state.student.email
      });
    }
  }

  handleInput(event) {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'name':
        this.setState({ name: value });
        break;
      case 'phone':
        this.setState({ phone: value });
        break;
      case 'email':
        this.setState({ email: value });
        break;
      case 'campusId':
        this.setState({ campusId: value })
        break;
    }
  }

  render() {
    if (!this.state.student.id) return <div></div>;
    const student = this.state.student;
    const campuses = this.props.campuses;
    return (
      <div>
        <div>
        <h6 className="nomarginTop text-muted">page: /single-student</h6>
        <h4>Single Student Maintenance</h4>
        </div>
        <div>
          <img src={ student.photo } className="imgStyle marginbelow" />
        </div>
        <div className="col-sm-4 margintop">
          <div className="row">
            <div className="col-sm-10 panel panel-default">
              <h5 className="center panel-heading">{ student.name } Details</h5>
              <form onSubmit={ this.handleSubmit }>
                <div className="margintop">
                  <label>Name: </label>
                  <input
                    name="name"
                    value={ this.state.name }
                    onChange={ this.handleInput }
                    className="setWidth tabrightsm"
                    type="text">
                  </input>
                </div>
                <div className="margintop">
                  <label>Phone: </label>
                  <input
                    name="phone"
                    value={ this.state.phone }
                    onChange={ this.handleInput }
                    className="setWidth tabrightsm"
                    type="text">
                  </input>
                </div>
                <div className="margintop">
                  <label>Email: </label>
                  <input
                    name="email"
                    value={ this.state.email }
                    onChange={ this.handleInput }
                    className="setWidth tabrightsm"
                    type="text">
                  </input>
                </div>
                <label className="margintop">Select a Campus</label>
                <select
                  className="form-control margintop"
                  value={ this.state.campusId }
                  onChange={ this.handleInput }
                  name="campusId"
                >
                  {
                    campuses.map(campus => {
                      return (
                        <option key={ campus.id } value={ campus.id  }>
                          {campus.name}
                        </option>
                      )
                    })
                  }
                </select>     
                <div className="margintop">
                  <label>Photo (url):</label>
                  <label className="tabrightsm">{ this.state.photo }</label>
                </div>
                <button className="btn btn-primary margintop marginbelow" type="submit">Update Student</button>
                <div className="center textRed marginbelow">{ this.state.errorAdd }</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state, { router }) {
  const selectedStudent = state.students.selectedStudents;
  return { selectedStudent, router };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ gotSingleStudent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
