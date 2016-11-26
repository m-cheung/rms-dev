import React, {Component, PropTypes} from 'react';
import {Jumbotron} from 'react-bootstrap';

const RANK = {
  1: 'Primary',
  2: 'Secondary',
  3: 'Rookie'
};

export default
class ProfileOverview extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {user} = this.props;
    if (user) {
      return (
        <div>
          <h1>{`${user.firstName} ${user.lastName} (${RANK[user.rank]})`}</h1>
          <Jumbotron>
            Certifications:
          </Jumbotron>
        </div>
      );
    }
    return (<div></div>);
  }
}
