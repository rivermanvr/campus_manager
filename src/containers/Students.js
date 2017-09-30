import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Students extends Component {
  constructor({ students, campuses, addStudent, removeStudent }) {
    super();
    this.state = {
      name: '', phone: '', email: '', campusId: 1, errorAdd: '',
      photo: '/assets/images/Campus-Gargolye-v1.jpeg' };

    this.clearState = this.clearState.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  clearState() {
    this.setState({ name: '', phone: '', email: '', campusId: 1, errorAdd: '' })
  }

  componentDidMount() {
    this.clearState();
  }

  componentWillReceiveProps() {
    this.clearState();
  }

  handleRemove(event) {
    this.props.removeStudent(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    if(this.state.name && this.state.email) {
      this.props.addStudent(this.state);
    } else {
      this.setState({ errorAdd: 'The name & email fields are required' });
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
    const students = this.props.students;
    const campuses = this.props.campuses;
    const changeCampus = this.props.changeCampus;
    if (!students.length) return <div></div>;
    const none = [{ id: '0', name: '--none--' }];
    const campusesSelect = none.concat(campuses);
    return (
      <div>
        <h6 className="nomarginTop text-muted">page: /students</h6>
        <h4>All Students - Maintenance</h4>
        <div className="col-sm-8 margintop marginbelow">
          <ul className="list-group">
            {
              students.map(student => {
                return (
                  <li className="list-group-item marginbelowsm" key={ student.id }>
                    <div className="marginbelowsm margintopsm">
                      <Link to={ `/student/${ student.id }` }><strong>{student.name} - Campus: { (student.campus.name) }</strong></Link>
                      <button
                        className="btn btn-danger margintopsm marginbelow pull-right moveupsm"
                        value={ student.id }
                        onClick={ this.handleRemove }>
                        Remove Student Record
                      </button>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="col-sm-4 margintop">
          <div className="row">
            <div className="col-sm-10 panel panel-default">
              <h5 className="center panel-heading">Add a Student</h5>
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
                <div className="margintop">
                  <label>Select a Campus</label>
                  <select
                    className="form-control"
                    value={ this.state.campusId }
                    onChange={ this.handleInput }
                    name="campusId"
                  >
                    {
                      campusesSelect.map(campus => {
                        return (
                          <option key={ campus.id } value={ campus.id  }>
                            {campus.name}
                          </option>
                        )
                      })
                    }
                  </select>                
                </div>
                <div className="margintop">
                  <label>Photo (url):</label>
                  <label className="tabrightsm">"Campus-Gargolye-v1.jpeg"</label>
                </div>
                <button className="btn btn-primary margintop marginbelow" type="submit">Add Student</button>
                <div className="center textRed marginbelow">{ this.state.errorAdd }</div>
              </form>
            </div>
            <div className="textBlue col-sm-10 panel panel-default center">
              Please be aware that Removing the Student Record is a permanent deletion.
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Students;
