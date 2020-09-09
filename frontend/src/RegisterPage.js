import React from 'react';


class RegisterPage extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div class="logincontainer" >
        <div class="labelInput">
          <label > E-mail</label>
          <input name="email" class="emailInput"/>
        </div>
        <div class="labelInput">
          <label> Username</label>
          <input name="username" class="usernameInput"/>
        </div>
        <div class="labelInput">
          <label> Password </label>
          <input type="password" name="password1" class="passwordInput" />
        </div>
        <div class="labelInput">
          <label> Password </label>
          <input type="password" name="password2" class="passwordInput" />
        </div>
        <div class = "labelInput">
          <button class ="ContinueButton">
            Register
          </button>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
