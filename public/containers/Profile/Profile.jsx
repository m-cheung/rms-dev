import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as profileActions from 'redux/modules/profile';
import {isLoaded, load as loadProfile} from 'redux/modules/profile';
import {initializeWithKey} from 'redux-form';
import { Button } from 'react-bootstrap';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadProfile());
    }
  }
}])
@connect(
  state => ({
    profile: state.profile.data,
    // editing: state.widgets.editing,
    error: state.profile.error,
    loading: state.profile.loading
  }),
  {...profileActions, initializeWithKey })
export default class Profile extends Component {
  static propTypes = {
    error: PropTypes.object,
    // initializeWithKey: PropTypes.func.isRequired,
    // editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    // editStart: PropTypes.func.isRequired
    profile: PropTypes.array,
    // success: PropTypes.object,
  };

  render() {
    const {load, loading} = this.props; // error can go here
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Profile.scss');
    return (
      <div className={styles.shifts + ' container'}>
        <h1>
          Profile
          <Button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Shifts
          </Button>
        </h1>
        <Helmet title="Profile"/>
      </div>
    );
  }
}

