import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { gotSingleCampus } from '../actions';

class Campus extends Component {
  constructor() {
    super();
    this.state = {
      id: 0, name: '', photo: '',
      phone: '', errorAdd: '' };

    this.handleRemove = this.handleRemove.bind(this);
    this.getData = this.getData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  getData() {
    this.setState({
      id: this.props.selectedCampus.id,
      name: this.props.selectedCampus.name,
      photo: this.props.selectedCampus.photo.slice(15),
      phone: this.props.selectedCampus.phone,
      errorAdd: ''
    })
  }

  componentDidMount(){
    const campusId = this.props.router.match.params.id;
    this.props.gotSingleCampus(campusId)
    .then(() => {
      this.getData();
    })
  }

  componentWillReceiveProps() {
    if (!this.props.selectedCampus.id) return;
    this.getData();
  }

  handleRemove(event) {
    this.props.changeStudentCampus(event.target.value);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      const campusChg = this.state;
      campusChg.photo = this.props.selectedCampus.photo;
      // this.props.updateCampus(campusChg);
    } else {
      this.setState({ errorAdd: 'Name cannot be blank', name: this.state.campus.name });
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
    }
  }

  render() {
    if (!this.props.selectedCampus.id) return <div></div>;
    const campus = this.props.selectedCampus;
    const students = this.props.selectedCampus.students;
    return (
      <div>
        <div>
          <h6 className="nomarginTop text-muted">page: /single-campus</h6>
          <h4>Single Campus Maintenance: <span className="textBlue">{ campus.name }</span></h4>
          <div>
            <img src={ campus.photo } className="imgStyle marginbelow" />
          </div>
          <div className="col-sm-8 margintop marginbelow">
            <ul className="list-group">
              {
                students.map(student => {
                  return (
                    <li className="list-group-item marginbelowsm" key={ student.id }>
                      <div className="marginbelowsm margintopsm">
                        <Link to={ `/student/${ student.id }` }><strong>{student.name}</strong></Link>
                        <button
                          className="btn btn-danger margintopsm marginbelow pull-right moveupsm"
                          value={ student.id }
                          onClick={ this.handleRemove }>
                          Remove from Campus
                        </button>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className="col-sm-4 margintop">
          <div className="row">
            <div className="col-sm-10 panel panel-default">
              <h5 className="center panel-heading">Campus Details</h5>
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
                  <label>Photo (url):</label>
                  <div className="tabrightsm">{ this.state.photo }</div>
                </div>
                <button className="btn btn-primary margintop marginbelow" type="submit">Update Campus</button>
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
  const selectedCampus = state.campuses.selectedCampus;
  return { selectedCampus, router };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ gotSingleCampus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Campus);
