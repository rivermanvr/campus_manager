import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tab = ({ tab, path })=> {
  return (
    <li className={ path === tab.path ? 'active': null }>
      <Link to={ tab.path }>
        { tab.title }
        {
          tab.count === undefined ? null : ( <span> ({ tab.count })</span>)
        }
      </Link>
    </li>
  );
}

class Navbar extends Component {
  render() {
    const path = this.props.router.location.pathname;
    const cLen = this.props.campuses.campuses.length
    const sLen = this.props.students.students.length
    const tabs = [
      { title: 'Campuses', path: '/campus', count: cLen },
      { title: 'Students', path: '/student', count: sLen }
    ];
    return (
      <ul className="nav nav-tabs mainnav" style={ { marginBottom: '10px' } }>
        {
          tabs.map( tab => <Tab key={ tab.path } tab={ tab } path={ path } />)
        }
      </ul>
    );
  }
}

function mapStateToProps (state, { router }) {
  const { campuses, students } = state;
  return { campuses, students, router };
}

export default connect(mapStateToProps)(Navbar);
