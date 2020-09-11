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
    this.state = {
      credential : {
        'username': "",
        'password': "",
        'logged': false,
	  },
      remember:false,
    }
  }

  changeUsername = (val) => {
	let newCredential =  { ...this.state.credential};
	newCredential.username = val;
    this.setState({
      credential: newCredential,
    });
  }

  changePassword = (val) => {
    let newCredential =  { ...this.state.credential};
	newCredential.password = val;
    this.setState({
      credential: newCredential,
    });
  }

  changeLogged = (val) => {
    let newCredential =  { ...this.state.credential};
	newCredential.logged = val;
    this.setState({
      credential: newCredential,
    });
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

 


  render() {
    return (
      <div className = 'application'>
        <BrowserRouter>
            <ButtonsBar username = {this.state.username} password = {this.state.password} loggedin = {this.state.loggedin} />
              <Switch>
               <Route path="/login">  <LoginPage credential={this.state.credential}/> </Route>
               <Route path="/register"> <RegisterPage />  </Route>
               <Route path="/">  <Canvas /> <Sidebar /> </Route>
              </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Application
