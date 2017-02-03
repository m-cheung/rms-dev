import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, login, logout } from 'redux/modules/auth';
import { InfoBar } from 'components';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {login, logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    window.location = 'https://cas.uwaterloo.ca/cas/login?service=http%3A%2F%2Flocalhost%3A3000%2Flogin';
    // this.props.login();
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{color: '#33e0ff'}}>
                <div className={styles.brand}/>
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              {user &&
              <LinkContainer to="/shifts">
                <NavItem eventKey={1}>Shifts</NavItem>
              </LinkContainer>}
              {user &&
              <LinkContainer to="/admin">
                <NavItem eventKey={2}>Admin Options</NavItem>
              </LinkContainer>}
              <LinkContainer to="/widgets">
                <NavItem eventKey={3}>Widgets</NavItem>
              </LinkContainer>
              <LinkContainer to="/survey">
                <NavItem eventKey={4}>Survey</NavItem>
              </LinkContainer>
              <LinkContainer to="/about">
                <NavItem eventKey={5}>About Us</NavItem>
              </LinkContainer>
            </Nav>
            <Nav navbar pullRight>
              {!user &&
              <NavItem eventKey={6} className="login-link" onClick={this.handleLogin}>
                Login
              </NavItem>}
              {user &&
              <NavDropdown eventKey={7} title={'Logged in as ' + user.firstName + ' ' + user.lastName} id="user-dropdown">
                <LinkContainer to="/profile">
                  <NavItem eventKey={7.1} className="profile-link">
                    Profile
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <NavItem eventKey={7.2} className="logout-link" onClick={this.handleLogout}>
                    Logout
                  </NavItem>
                </LinkContainer>
              </NavDropdown>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>
        <InfoBar/>

        <div className="well text-center">
          A division of FEDS at the University of Waterloo
        </div>
      </div>
    );
  }
}
