import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as shiftsActions from 'redux/modules/shifts';
import {isLoaded, load as loadShifts} from 'redux/modules/shifts';
import {initializeWithKey} from 'redux-form';
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

  render() {
   // const handleEdit = (widget) => {
   //   const {editStart} = this.props; // eslint-disable-line no-shadow
   //   return () => editStart(String(widget.id));
   // };
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
        <p>
          If you hit refresh on your browser, the data loading will take place on the server before the page is returned.
          If you navigated here from another page, the data was fetched from the client after the route transition.
          This uses the decorator method <code>@asyncConnect</code> with the <code>deferred: true</code> flag. To block
          a route transition until some data is loaded, remove the <code>deffered: true</code> flag.
          To always render before loading data, even on the server, use <code>componentDidMount</code>.
        </p>
        <p>
          This widgets are stored in your session, so feel free to edit it and refresh.
        </p>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        {shifts && shifts.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.idCol}>Name</th>
            <th className={styles.colorCol}>Start</th>
            <th className={styles.sprocketsCol}>End</th>
            <th className={styles.ownerCol}>Owner</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            shifts.map((shift) =>
              <tr key={shift.id}>
                <td className={styles.idCol}>{shift.name}</td>
                <td className={styles.colorCol}>{shift.start}</td>
                <td className={styles.sprocketsCol}>{shift.end}</td>
                <td className={styles.ownerCol}>{shift.description}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary">
                    <i className="fa fa-pencil"/> Edit
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

