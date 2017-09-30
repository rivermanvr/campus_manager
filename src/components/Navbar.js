import React from 'react';
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

const Navbar = ({ router, sLen, cLen }) => {
  const path = router.location.pathname;
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
};

export default Navbar;
