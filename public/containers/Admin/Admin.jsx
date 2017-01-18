import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as adminActions from 'redux/modules/admin';
// import { isLoaded, load as loadProfile, loadCertificates } from 'redux/modules/profile';
import { initializeWithKey } from 'redux-form';
import { Alert, Col, Nav, NavItem, Row, Tab } from 'react-bootstrap';
// import { asyncConnect } from 'redux-async-connect';

@connect(
  state => ({
    profile: state.profile.data,
    error: state.profile.error,
    loading: state.profile.loading
  }),
  {...adminActions, initializeWithKey })
export default class Admin extends Component {
  static propTypes = {
    error: PropTypes.object,
    load: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    profile: PropTypes.object,
  };

  render() {
    const {error, loading} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Admin.scss');
    return (
      <div className={styles.admin + ' container'}>
        <h1>
          Admin Options
        </h1>
        <Helmet title="Admin Panel" />

        <Tab.Container id="left-tabs-example" defaultActiveKey="Overview">
          <Row className="clearfix">
            <Col sm={3}>
              <Nav bsStyle="pills" stacked>
                <NavItem eventKey="NewShift">
                  <span className="glyphicon glyphicon-credit-card" aria-hidden="true"/> New Shift
                </NavItem>
                <NavItem eventKey="ShiftTypes">
                  <span className="glyphicon glyphicon-credit-card" aria-hidden="true"/> Shift Types
                </NavItem>
                <NavItem eventKey="Responders">
                  <span className="glyphicon glyphicon-calendar" aria-hidden="true"/> Responders
                </NavItem>
                <NavItem eventKey="EoT">
                  <span className="glyphicon glyphicon-calendar" aria-hidden="true"/> End of Term
                </NavItem>
              </Nav>
            </Col>
            <Col sm={9}>
              {error &&
                <Alert bsStyle="danger">
                  <h4>Oh snap!</h4>
                  {error.message}
                </Alert>}
              <Tab.Content animation>
                <Tab.Pane eventKey="Overview">
                  a
                </Tab.Pane>
                <Tab.Pane eventKey="Certifications">
                  a
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
