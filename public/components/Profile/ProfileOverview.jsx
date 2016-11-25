import React, {Component, PropTypes} from 'react';

export default
class ProfileOverview extends Component {
  static propTypes = {
    user: PropTypes.user
  }

  render() {
    return (
      <div>
        Overview!
      </div>
    );
  }
}
