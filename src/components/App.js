import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../containers/NavBar';
import Campuses from '../containers/Campuses';
import Campus from '../containers/Campus';
import Students from '../containers/Students';
import Student from '../containers/Student'

export default function AppContainer() {
  return (
    <div className="container-fluid">
      <h3>Welcome to Campus-Manager</h3>
      <Route render={ (router) => <Navbar router={ router } /> } />
      <Switch>
      <Route exact path="/student" component={ Students } />
      <Route
        path="/campus/:id" render={ (router) => <Campus router={ router } /> }
      />
      <Route
        path="/student/:id" render={ (router) => <Student router={ router } /> }
      />
      <Route
        path="/" component={ Campuses } />
    </Switch>
    </div>
  )
}
