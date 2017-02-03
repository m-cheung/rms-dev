import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
// import { Table } from 'react-bootstrap';
import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';

@connect(
  state => ({
    responders: state.admin.responders
  }))
export default class Responders extends Component {
  static propTypes = {
    responders: PropTypes.array,
  }

  render() {
    // const { responders } = this.props; // eslint-disable-line no-shadow
    // const styles = require('./ProfileCertificates.scss');

    return (
      <div>
        <h1>Responders</h1>
        <Helmet title="Responders" />


      </div>
    );
  }
}
