import React from 'react';


class LoginPage extends React.Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div class="fullContainer">
        <div>
          <div class="child">
            <div>
                <label class="labelElement"> Username</label>
            </div>
            <div>
                <label class="labelElement"> Password </label>
            </div>
            <div>
                <label class="labelElement"> Remember me </label>
            </div>
          </div>
          <div  >
            <div>
              <input name="username" class="inputElement"/>
            </div>
            <div>
              <input type="password" name="password" class="inputElement"/>
            </div>
            <div>
              <input type="checkbox" name="remember-me" class="rememberme"/>
            </div>
          </div>
        </div>

        <div class ="belowButton">
          <button class = "ContinueButton">
            Log In
          </button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
