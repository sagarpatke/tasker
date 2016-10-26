import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {Router, Route, hashHistory} from 'react-router';

import HomeView from './views/HomeView';
import DashView from './views/DashView';

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={hashHistory}>
      <Route path="/" component={HomeView} onEnter={redirectIfAuthenticated} />
      <Route path="/dash" component={DashView} onEnter={redirectIfNotAuthenticated} />
    </Router>
  </MuiThemeProvider>, document.getElementById('content')
);

function redirectIfAuthenticated(nextState, replace, next) {
  const token = cookie.load('token');
  if(token) { replace('/dash'); }
  next();
}

function redirectIfNotAuthenticated(nextState, replace, next) {
  const token = cookie.load('token');
  if(!token) { replace('/') }
  next();
}
