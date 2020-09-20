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
      chartName : '',
    }
    this.changeUsername = this.changeUsername.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeLogged = this.changeLogged.bind(this);
  }

  changeChartName = (val) => {
    this.setState({
      chartName : val
    })
  }

  clearData = async() => {
    let newCredential = {
      'email': "",
      'username': "",
      'password': "",
      'logged': false,
    }
    this.setState({
      credential: newCredential,
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


  loggingIn = {
        'changeEmail': this.changeEmail,
        'changeUsername': this.changeUsername,
        'changePassword': this.changePassword,
        'changeLogged': this.changeLogged,
  };




  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
            <ButtonsBar username = {this.state.credential.username} password = {this.state.credential.password} loggedin = {this.state.credential.logged} clearData={this.clearData}/>
              <Switch>
               <Route path="/login">  <LoginPage loggingIn = {this.loggingIn}/> </Route>
               <Route path="/register"> <RegisterPage />  </Route>
               <Route path="/verify" > <VerifyPage /> </Route>
               <Route path="/myCharts"> <UserCharts credential={this.state.credential} changeChartName={this.changeChartName}/> </Route>
                <Route path="/"> <Sidebar email={this.state.credential.email} password ={this.state.credential.password} changeChartName = {this.changeChartName} chartName = {this.state.chartName}/> </Route>
            </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default Application
