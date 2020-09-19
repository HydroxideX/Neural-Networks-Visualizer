import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ButtonsBar from './Components/TopBar/ButtonsBar.js'
import Sidebar from './Components/MainArea/Sidebar.js'
import LoginPage from './LoginPage.js'
import RegisterPage from './RegisterPage.js'
import UserCharts from './Components/UserData/UserCharts.js'
import sha512 from 'crypto-js/sha512'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import VerifyPage from './VerifyPage';

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
      chartName : '',
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeLogged = this.changeLogged.bind(this);
  }

  componentDidMount(){
    this.setState({
      remember:false,
    })
    let newCredential =  { ...this.state.credential};
  	newCredential.email = localStorage.getItem('email');
    newCredential.username = localStorage.getItem('username');
    newCredential.password = localStorage.getItem('password');
    var logged = false;
    if(localStorage.getItem('logged')==="true" ) {
      logged = true;
    }
    newCredential.logged = logged;
    this.setState({
      credential: newCredential,
    });
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

  clearData = () => {
    if (typeof(Storage) !== "undefined") {
       localStorage.setItem('username','');
       localStorage.setItem('email','');
       localStorage.setItem('password','');
       localStorage.setItem('logged',false);
       localStorage.setItem('remember',false);
    }
  }

  changeChartName = (val) => {
    this.setState({
      chartName : val
    })
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
    if(this.state.remember === true){
      this.storeData();
    } else {
      this.clearData();
    }
  }



  changePassword = (val) => {
    let newCredential =  { ...this.state.credential};
	  newCredential.password = sha512(val).toString();
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
      <React.Fragment>
        <BrowserRouter>
            <ButtonsBar username = {this.state.credential.username} password = {this.state.credential.password} loggedin = {this.state.credential.logged} />
              <Switch>
               <Route path="/login">  <LoginPage loggingIn = {this.loggingIn}/> </Route>
               <Route path="/register"> <RegisterPage />  </Route>
               <Route path="/verify" > <VerifyPage /> </Route>
               <Route path="/"> <Sidebar email={this.state.credential.email} password ={this.state.credential.password} changeChartName = {this.changeChartName} chartName = {this.state.chartName}/> </Route>
               <Route path="/myCharts"> <UserCharts credential={this.state.credential}/> </Route>
              </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default Application
