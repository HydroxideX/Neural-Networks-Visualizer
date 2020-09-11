import React from 'react';


class RegisterPage extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (

      <div class="fullContainer">
        <div>
          <div class="child">
            <div>
                <label class="labelElement"> Email</label>
            </div>
            <div>
                <label class="labelElement"> Username</label>
            </div>
            <div>
                <label class="labelElement"> Password </label>
            </div>
            <div>
                <label class="labelElement"> Password </label>
            </div>
          </div>
          <div  >
            <div>
              <input name="email" class="inputElement"/>
            </div>
            <div>
              <input name="username" class="inputElement"/>
            </div>
            <div>
              <input type="password" name="password1" class="inputElement"/>
            </div>
            <div>
              <input type="password" name="password2" class="inputElement"/>
            </div>
          </div>
        </div>

        <div class ="registerButton">
          <button class = "ContinueButton">
            Register
          </button>
        </div>
      </div>


    );
  }
}

export default RegisterPage;
