import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import AppContainer from './containers/app_container';

ReactDOM.render(<Router><AppContainer /></Router>, document.getElementById('root'));
