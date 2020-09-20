import React from 'react';
import { Redirect } from 'react-router-dom';


class VerifyPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);

        this.state = {
            email: "",
            enteredCode:"",
            returnValue: "",
            error: "",
            redirect: ""
        }
    }

    handleChangeEmail(event) {
        this.setState({ enteredCode: event.target.value });
      }

      signin = () => {

        if (this.state.enteredCode === "") {
          this.setState({ error: "Enter Code!" });
          return;
        }
        this.sendData(this.getOutputOrRedirect);
      }

      sendData = async (output) => {
        await fetch('http://18.219.98.125:8000/users/verify_email/', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            "code": this.state.enteredCode,
          })
        }).then(response => response.json()
        ).then(data =>{
          this.setState({ returnValue: data }
        )}
        )
        output();
      }

      getOutputOrRedirect = () => {
        if (this.state.returnValue === "false") {
          this.setState({
            error: "Code is incorrect!"
          })
        } else {
          this.setState({
            error: "Log in Complete!",
            redirect: "/"
          });
        }
      }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        else {
            return (
                <div class="container">
                    <div class="d-flex justify-content-center h-100">
                        <div class="card">
                            <div class="card-header">
                                <h3>Enter Code</h3>
                            </div>
                            <div class="card-body">
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="0000000" onChange={this.handleChangeEmail} />

                                </div>
                                <div class="form-group">
                                    <button class="btn float-right login_btn" onClick={this.signin}> Verify </button>
                                </div>
                                <label> {this.state.error}</label>
                            </div>

                        </div>
                    </div>
                </div>

            );
        }
    }
}

export default VerifyPage;
