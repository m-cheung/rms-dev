import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Admin,
    Home,
    Shifts,
    Widgets,
    About,
    Profile,
    LoginSuccess,
    Survey,
    NotFound,
  } from 'containers';

// Authorization Mask (Lower bits reserved for server)
// const SHIFTS_PERMISSION = 65536;     // 0000 0000 0000 0001 0000 0000 0000 0000

// function permissionCheck(param1, param2, param3, param4) {
//   console.log(param1);
//   console.log(param2);
//   console.log(param3);
//   console.log(param4);
// }


export default (store) => {
  const redirectLogin = (nextState, replace, cb) => {
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth());
    }
    cb();
  };

  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    // In the future, revoke token if authorization fails.
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}>
        <Route path="loginSuccess" component={LoginSuccess}/>
        <Route path="admin" component={Admin}/>
        <Route path="profile" components={Profile}/>
        <Route path="shifts" component={Shifts}/>
      </Route>

      { /* Routes */ }
      <Route path="about" component={About}/>
      <Route path="login" component={Home} onEnter={redirectLogin}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
