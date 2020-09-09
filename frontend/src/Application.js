import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ButtonsBar from './Components/TopBar/ButtonsBar.js'
import Canvas from './Components/ChartsCanvas/Canvas.js'
import Sidebar from './Components/ChartsSidebar/Sidebar.js'
import LoginPage from './LoginPage.js'
import RegisterPage from './RegisterPage.js'

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      username:"",
      password:"",
      logged:false,
      remember:false,
    }
  }

  changeUsername = (val) => {
    this.setState({
      username: val
    })
  }

  changePassword = (val) => {
    this.setState({
      password: val
    })
  }

  changeLogged = (val) => {
    this.setState({
      logged: val
    })
  }

  changeRemember = (val) => {
    this.setState({
      remember: val
    })
  }

  loggingIn = {
        'changeUsername': this.changeUsername,
        'changePassword': this.changePassword,
        'changeLogged': this.changeLogged,
        'changeRemember': this.changeRemember,
  };

  /*credential = {
        'username': this.state.username,
        'password': this.state.password,
        'logged': this.state.logged,
  };*/


  render() {
    return (
      <div className = 'application'>
        <BrowserRouter>
            <ButtonsBar username = {this.state.username} password = {this.state.password} loggedin = {this.state.loggedin} />
              <Switch>
               <Route path="/login">  <LoginPage /> </Route>
               <Route path="/register"> <RegisterPage />  </Route>
               <Route path="/">  <Canvas /> </Route>
              </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Application
