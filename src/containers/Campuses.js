import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { addCampus, removeCampus, fetchData } from '../actions';

class Campuses extends Component {
  constructor() {
    super();
    this.state = { name: '', phone: '',
      photo: '/assets/images/Campus-Gargoyle-v2.jpeg',
      selectCampus: 0, errorAdd: '', errorRemove: '' };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  clearState() {
    this.setState({
      name: '',
      phone: '',
      photo: '/assets/images/Campus-Gargoyle-v2.jpeg',
      selectCampus: 0,
      errorAdd: '',
      errorRemove: '',
    })
  }

  componentDidMount() {
    this.clearState();
    console.log('in componentDidMount')
    this.props.fetchData();
  }

  handleRemove(event) {
    event.preventDefault();
    if (this.state.selectCampus) {
      this.props.removeCampus(this.state.selectCampus);
    } else {
      this.setState({ errorRemove: 'Campus Selecting is required for Remove', errorAdd: '' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      this.props.addCampus(this.state)
      this.clearState();
    } else {
      this.setState({ errorAdd: 'The name field is required', errorRemove: '' });
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
      case 'selectCampus':
        this.setState({ selectCampus: value })
        break;
    }
  }

  render() {
    const campuses = this.props.campuses.campuses;
    
    if (!campuses.length) return <div></div>;
    const none = [{ id: '0', name: '--none--' }];
    let campusesSelect = none.concat(campuses);
    campusesSelect = campusesSelect.filter(campus => campus.id !== 1);
    return (
      <div className="container-fluid">
        <h6 className="nomarginTop text-muted">page: /campuses</h6>
        <h4>Overall Campus Maintenance</h4>
        <div className="col-sm-8 margintop">
          <div className="row">
            {
              campuses.map(campus => {
                return (
                  <div className="col-sm-4" key={ campus.id }>
                    <Link to={ `/campus/${ campus.id }` }>
                      <h5>{ campus.name } - ({ campus.students.length })</h5>
                      <img src={ campus.photo } className="imgStyle" />
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="col-sm-4 margintop">
          <div className="row">
            <div className="col-sm-10 panel panel-default">
              <h5 className="center panel-heading">Add Campus</h5>
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
                  <label className="tabrightsm">Campus-Gargoyle-v2.jpeg</label>
                </div>
                <button className="btn btn-primary margintop marginbelow" type="submit">Add Campus</button>
                <div className="center textRed marginbelow">{ this.state.errorAdd }</div>
              </form>
            </div>
            <div className="col-sm-10 panel panel-default">
              <h5 className="center panel-heading">Remove Campus</h5>
              <form onSubmit={ this.handleRemove }>
                <label className="margintop">Select a Campus</label>
                <select
                  className="form-control margintop"
                  value={ this.state.selectCampus }
                  onChange={ this.handleInput }
                  name="selectCampus"
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
                <button className="btn btn-danger margintop marginbelow" >Remove Campus</button>
                <div className="center textRed marginbelow">{ this.state.errorRemove }</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  //------------checking my work----------------
  console.log('.....in mapStateTo Props: ', state);
  const { campuses } = state;
  return { campuses };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ addCampus, removeCampus, fetchData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Campuses);
