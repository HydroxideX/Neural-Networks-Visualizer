import React from 'react';
import HomeButton from './HomeButton.js'
import Login from './Login.js'
import Logout from './Logout.js'
import Register from './Register.js'
import Profile from './Profile.js'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

class ButtonsBar extends React.Component {

  constructor(props) {
    super(props);
    this.clearLocal = this.clearLocal.bind(this);
  }

  clearLocal= async () => {
    await this.props.clearData();
    this.forceUpdate();
  }

  render() {
    var loggedin = this.props.loggedin ? 'collapse navbar-collapse' : 'nothing';
    var loggedout = this.props.loggedin ? 'nothing' : 'collapse navbar-collapse';
    return (
      <React.Fragment>

        <nav class="navbar fixed-top navbar-expand-md custom-navbar navbar-dark">
          <Link to="/">  <HomeButton /> </Link>
          <button class="navbar-toggler navbar-toggler-right custom-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon "></span>
          </button>
          <div class={loggedout} id="collapsibleNavbar">

            <ul class="navbar-nav ml-auto ">
              <li class="nav-item">
                <Link to="/login">  <Login /> </Link>
              </li>
              <li class="nav-item">
                <Link to="/register">  <Register /> </Link>
              </li>
            </ul>
          </div>
          <div class={loggedin}  id="collapsibleNavbar">

            <ul class="navbar-nav ml-auto ">
              <li class="nav-item">
                <Link to="/myCharts">  <Profile username={this.props.username}/> </Link>
              </li>
              <li class="nav-item">
                <Link to="/">  <Logout clearData={this.clearLocal}/> </Link>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default ButtonsBar;
