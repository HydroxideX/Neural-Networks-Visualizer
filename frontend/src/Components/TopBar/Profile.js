import React from 'react';


class Profile extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <button type="button" class="btn btn-primary">{this.props.username}</button>
    );
  }
}

export default Profile;
