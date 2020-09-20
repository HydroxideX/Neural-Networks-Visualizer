import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  Redirect,
  Route,
  Link
} from "react-router-dom";
import sha512 from 'crypto-js/sha512'
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword1 = this.handleChangePassword1.bind(this);
    this.handleChangePassword2 = this.handleChangePassword2.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.state =
    {
      email: "",
      username: "",
      password1: "",
      password2: "",
      error: "",
      returnValue: "",
      redirect: false,
    };
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }
  handleChangePassword1(event) {
    let pass = sha512(event.target.value);
    this.setState({ password1: pass.toString() });
  }
  handleChangePassword2(event) {
    let pass = sha512(event.target.value);
    this.setState({ password2: pass.toString()});
  }

  getOutputOrRedirect = () => {
    if (this.state.returnValue === "false") {
      this.setState({
        error: "Email already registered!"
      })
    } else {
      this.setState({
        error: "Log in Complete!",
        redirect: "verify"
      });
    }
  }


  sendData = async (output) => {
    await fetch('http://127.0.0.1:8000/users/register/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.email,
        "username": this.state.username,
        "password": this.state.password1,
        "is_active": false,
        "code":0,
        "is_verified":false
      })
    }).then(response => response.json()
    ).then(data =>{
      this.setState({ returnValue: data }
    )}
    )
    output();
  }


  registerUser = () => {

    if (this.state.password1 !== this.state.password2) {
      this.setState({ error: "Passwords dont match!" });
      return;
    }

    if (this.state.email === "") {
      this.setState({ error: "Enter Email!" });
      return;
    }
    if (this.state.username === "") {
      this.setState({ error: "Enter Username!" });
      return;
    }

    if (this.state.password1 === "") {
      this.setState({ error: "Enter Password!" });
      return;
    }
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
                <h3>Sign Up</h3>
              </div>
              <div class="card-body">
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                  </div>
                  <input type="text" name="email" class="form-control" placeholder="Email Address" value={this.state.value} onChange={this.handleChangeEmail} />


                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                  </div>

                  <input type="text" name="username" class="form-control" placeholder="Username" value={this.state.value} onChange={this.handleChangeUsername} />



                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                  </div>
                  <input type="password" name="password1" class="form-control" placeholder="Password" value={this.state.value} onChange={this.handleChangePassword1} />
                </div>

                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                  </div>
                  <input type="password" name="password2" class="form-control" placeholder="Confirm Password" value={this.state.value} onChange={this.handleChangePassword2} />
                </div>

                <div class="form-group">
                  <button class="btn float-right login_btn" onClick={this.registerUser}> Sign up </button>
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


export default RegisterPage;
