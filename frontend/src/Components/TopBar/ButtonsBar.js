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

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div class = "Buttons">
        <Link to="/">  <HomeButton /> </Link>
        <Link to="/">  <Logout /> </Link>
        <Link to="/login">  <Login /> </Link>
        <Link to="/register">  <Register/> </Link>
      </div>
    );
  }
}

export default ButtonsBar;
