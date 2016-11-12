import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as shiftsActions from 'redux/modules/shifts';
import {isLoaded, load as loadShifts} from 'redux/modules/shifts';
import {initializeWithKey} from 'redux-form';
import { Table } from 'react-bootstrap';
// import { WidgetForm } from 'components';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadShifts());
    }
  }
}])
@connect(
  state => ({
    shifts: state.shifts.data,
    // editing: state.widgets.editing,
    // error: state.widgets.error,
    loading: state.widgets.loading
  }),
  {...shiftsActions, initializeWithKey })
export default class Shifts extends Component {
  static propTypes = {
    shifts: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    // initializeWithKey: PropTypes.func.isRequired,
    // editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    // editStart: PropTypes.func.isRequired
  };

  shiftHeader() {
    return (
      <tr>
        <td>Name</td>
        <td>Location</td>
      </tr>
    );
  }

  render() {
   // const handleEdit = (widget) => {
   //   const {editStart} = this.props; // eslint-disable-line no-shadow
   //   return () => editStart(String(widget.id));
   // };
    // const _this = this;
    const {shifts, error, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Shifts.scss');
    return (
      <div className={styles.widgets + ' container'}>
        <h1>
          Shifts
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Widgets
          </button>
        </h1>
        <Helmet title="Shifts"/>
        <p>You will only be able to take shifts which you meet the criteria for. The restrictions are...</p>
        <ul>
          <li>You cannot take any shifts if you are suspended</li>
          <li>You cannot take a shift that conflicts with another shift you already have</li>
          <li>If your total hours (past + future) meet the quota you cannot take a shift until it is critical</li>
        </ul>

        <p>You can see a report of your hours and shifts by clicking "profile" in the navigation bar.</p>
        <p>If a shift changes or is cancelled, those affected will be notified by telephone or e-mail and details will be
          posted here within 24 hours of the shift. If you notice any errors, please contact the director of scheduling ASAP.
        </p>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {shifts && shifts.length &&
        <Table className="table table-condensed">
          <thead>
            <tr>
              <th className={styles.colorCol}>Name</th>
              <th className={styles.colorCol}>Location</th>
              <th className={styles.idCol}>Start</th>
              <th className={styles.idCol}>End</th>
              <th className={styles.ownerCol}>Primary</th>
              <th className={styles.ownerCol}>Secondary</th>
              <th className={styles.ownerCol}>Rookie</th>
              <th className={styles.idCol}>Type</th>
            </tr>
          </thead>
          <tbody>
            {
              shifts.map((shift, index) =>
                  <tr index={index}>
                    <td>{shift.name}</td>
                    <td>{shift.location}</td>
                    <td>{new Date(shift.start).toString()}</td>
                    <td>{new Date(shift.end).toString()}</td>
                    <td>{shift.primaryId}</td>
                    <td>{shift.secondaryId}</td>
                    <td>{shift.rookieId}</td>
                    <td>{shift.type}</td>
                  </tr>)
            }
          </tbody>
        </Table>}
      </div>
    );
  }
}

