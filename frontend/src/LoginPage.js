import React from 'react';
import { Redirect } from 'react-router-dom';


class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeRemember = this.handleChangeRemember.bind(this);
    this.state = {
      email: "",
      password: "",
      rememberme: false,
      returnValue: "",
      error: "",
      redirect: ""
    }
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
    this.props.loggingIn.changeEmail(event.target.value);
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
    this.props.loggingIn.changePassword(event.target.value);
  }

  handleChangeRemember(event) {
    this.setState({ rememberme: event.target.checked });
    this.props.loggingIn.changeRemember(event.target.checked);
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
    console.log("output finished");
  }


  sendData = async (output) => {
    await fetch('http://127.0.0.1:8000/users/login/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password,
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    else {
      return (
        <div class="container">
          <div class="d-flex justify-content-center h-100">
            <div class="card">
              <div class="card-header">
                <h3>Sign In</h3>
              </div>
              <div class="card-body">
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                  </div>
                  <input type="text" class="form-control" placeholder="Email Address" onChange={this.handleChangeEmail} />

                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                  </div>
                  <input type="password" class="form-control" placeholder="Password" onChange={this.handleChangePassword} />
                </div>
                <div class="row align-items-center remember">
                  <input type="checkbox" onChange={this.handleChangeRemember} />Remember Me
      					</div>
                <div class="form-group">
                  <button class="btn float-right login_btn" onClick={this.signIn}> Sign in </button>
                </div>
                <label> {this.state.error}</label>
              </div>

            </div>
          </div>
        </div>

      );
    }
  }
}

export default LoginPage;
