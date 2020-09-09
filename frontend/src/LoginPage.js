import React from 'react';


class LoginPage extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div class="logincontainer" >
        <div class="labelInput">
          <label> Username</label>
          <input name="username" class="usernameInput"/>
        </div>
        <div class="labelInput">
          <label> Password </label>
          <input type="password" name="password" class="passwordInput" />
        </div>
        <div class="labelInput">
          <label> Remember me </label>
          <input type="checkbox" name="remember-me" class ="rememberme" />
        </div>
        <div class = "labelInput">
          <button class ="ContinueButton">
            Log In
          </button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
