import React from 'react';


class Logout extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <button style = {{fontSize: "80%" }}>
        Logout
      </button>
    );
  }
}

export default Logout;
