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
        'email': "",
        'username': "",
        'password': "",
        'logged': false,
	  },
      remember:false,
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeLogged = this.changeLogged.bind(this);
  }

  componentDidMount = () =>{
    console.log(localStorage.getItem('username'));
    console.log(localStorage.getItem('email'));
    console.log(localStorage.getItem('password'));
    console.log(localStorage.getItem('logged'));
    console.log(localStorage.getItem('remember'));
    this.setState({
      remember:false,
    })
    this.changeUsername(localStorage.getItem('username'));
    this.changeEmail(localStorage.getItem('email'));
    this.changePassword(localStorage.getItem('password'));
    this.changeLogged(localStorage.getItem('logged'));
    this.setState({
      remember: localStorage.getItem('remember'),
    })
  }

  storeData = ()=> {
     if (typeof(Storage) !== "undefined") {
        localStorage.setItem('username',this.state.credential.username);
        localStorage.setItem('email',this.state.credential.email);
        localStorage.setItem('password',this.state.credential.password);
        localStorage.setItem('logged',this.state.credential.logged);
        localStorage.setItem('remember',this.state.remember);
     }
  }

  changeEmail = (val) => {
	let newCredential =  { ...this.state.credential};
	newCredential.email = val;
    this.setState({
      credential: newCredential,
    });
  }

  changeUsername = (val) => {
  	let newCredential =  { ...this.state.credential};
  	newCredential.username = val;
    this.setState({
      credential: newCredential,
    });

    if(this.state.remember !== false){
      this.storeData()
    }
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
        'changeEmail': this.changeEmail,
        'changeUsername': this.changeUsername,
        'changePassword': this.changePassword,
        'changeLogged': this.changeLogged,
        'changeRemember': this.changeRemember,
  };




  render() {
    return (
      <div>
        <BrowserRouter>
            <ButtonsBar username = {this.state.username} password = {this.state.password} loggedin = {this.state.loggedin} />
              <Switch>
               <Route path="/login">  <LoginPage loggingIn = {this.loggingIn}/> </Route>
               <Route path="/register"> <RegisterPage />  </Route>
               <Route path="/">  <Canvas /> <Sidebar /> </Route>
              </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Application
