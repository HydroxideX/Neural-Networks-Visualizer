import React from 'react';


class HomeButton extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <button style = {{fontSize: "80%" }}>
        Home
      </button>
    );
  }
}

export default HomeButton;
