import React from 'react';
import ReactDOM from 'react-dom';
import {
Redirect
} from "react-router-dom";

class UserCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Redirect : '',
      output: {},
    }
    this.changeName = this.changeName.bind(this);
  }

  componentDidMount(){
    let link ='http://0.0.0.0:8000/users/get_charts/'+ this.props.credential.email
    fetch(link)
    .then(response => response.json())
    .then(data=>
      this.setState({
        output: data
      })
    );
  }

  changeName = (val) => {
    this.props.changeChartName(val);
    this.state.Redirect = '/';
    this.forceUpdate();

  }

  render() {
    if (this.state.Redirect) {
      return <Redirect to={this.state.Redirect} />
    }
    else {
      var self = this;
      return (
        <div className = "top">
          {

            Object.keys(this.state.output).map(function(keyName, keyIndex) {
                return <div><button key={keyIndex} className="btn btn-primary-outline" onClick={() =>self.changeName(keyName)}> {keyName} </button></div>
            })
          }
        </div>
      );
    }
  }
}

export default UserCharts
