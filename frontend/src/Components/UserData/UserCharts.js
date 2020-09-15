import React from 'react';
import ReactDOM from 'react-dom';
import {
Redirect
} from "react-router-dom";

class UserCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link:"",
      ChartsNames: [

      ],
    }
  }

  componentDidMount(){
    //redirect to login if user isnt signed in otherwise get data
  }


  getOutputOrRedirect = () => {
    if (this.state.returnValue === "false") {
      this.setState({
        error: "Incorrect Data Entered"
      })
    } else {
      this.setState({
        error: "Log in Complete!",
        redirect: "/"
      });
      this.props.loggingIn.changeLogged(true);
      this.props.loggingIn.changeUsername(this.state.returnValue);
    }
  }


  sendData = async (output) => {
    await fetch('http://127.0.0.1:8000/users/getData/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.props.credential.email,
        "password": this.props.credential.password,
      })
    },
      console.log("data sent")
    ).then(response => response.json(),
      console.log("response came")
    ).then(data =>
      this.setState({
        returnValue: data
      },
        console.log("setState completed", this.state)
      )
    )
    output();
  }


  signIn = () => {
    this.sendData(this.getOutputOrRedirect);
  }

  render() {
    return (
      <React.Fragment>

      </React.Fragment>
    );
  }
}

export default UserCharts
