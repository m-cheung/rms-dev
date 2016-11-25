import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as profileActions from 'redux/modules/profile';
import { isLoaded, load as loadProfile } from 'redux/modules/profile';
import { initializeWithKey } from 'redux-form';
import { Col, Nav, NavItem, Row, Tab } from 'react-bootstrap';
import { asyncConnect } from 'redux-async-connect';
import {ProfileOverview} from 'components';

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
    profile: PropTypes.object,
    // success: PropTypes.object,
  };

  render() {
    const {loading} = this.props; // error can go here
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Profile.scss');
    return (
      <div className={styles.profile + ' container'}>
        <h1>
          Profile
        </h1>
        <Helmet title="Profile" />

        <Tab.Container id="left-tabs-example" defaultActiveKey="Overview">
          <Row className="clearfix">
            <Col sm={4}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="Overview">
                  <span className="glyphicon glyphicon-file" aria-hidden="true"/> Overview
                </NavItem>
                <NavItem eventKey="Certifications">
                  <span className="glyphicon glyphicon-credit-card" aria-hidden="true"/> Certifications
                </NavItem>
                <NavItem eventKey="Shifts">
                  <span className="glyphicon glyphicon-calendar" aria-hidden="true"/> Shifts
                </NavItem>
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content animation>
                <Tab.Pane eventKey="Overview">
                  <ProfileOverview />
                </Tab.Pane>
                <Tab.Pane eventKey="Certifications">
                  Certs
                </Tab.Pane>
                <Tab.Pane eventKey="Shifts">
                  Shifts
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

