import React from 'react';


class Logout extends React.Component {

  constructor (props) {
    super(props);
  }


  render() {
    return (
      <button type="button" class="btn btn-primary" onClick={this.props.clearData} >Logout</button>
    );
  }
}

export default Logout;
