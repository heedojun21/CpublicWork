import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';


import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';


import logInCallBack from './components/logInCallBack';


import CSignIn from './components/auth/cSignIn';

import CSignUp from './components/auth/cSignUp';


import Practice from './components/practice/practice';
import PracticeSignIn from './components/practice/practiceSignIn';
import PracticeWebsocket from './components/practice/practiceWebsocket';

import emailSignUp from './components/auth/emailSignUp';


/* <IndexRoute component={App} /> */

export default (
  <div>
    <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
      <Route path="signin" component={Signin} />
      <Route path="signout" component={Signout} />
      <Route path="signup" component={Signup} />

      <Route path="cSignIn" component={CSignIn} />
      <Route path="cSignUp" component={CSignUp} />
      

      <Route path="feature" component={RequireAuth(Feature)} />
      <Route path="welcome" component={Welcome} />
      <Route path="logInCallBack" component={logInCallBack} />


      <Route path="practice" component={Practice} />
      <Route path="practiceSignIn" component={PracticeSignIn} />
      <Route path="practiceWebsocket" component={PracticeWebsocket} />

    </Route>

  </div>
);
