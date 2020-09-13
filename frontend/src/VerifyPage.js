import React from 'react';
import { Redirect } from 'react-router-dom';


class VerifyPage extends React.Component {

    constructor(props) {
        super(props);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);

        this.state = {
            email: "",
            password: "",
            rememberme: false,
            enteredCode:"",
            returnValue: "",
            error: "",
            redirect: ""
        }
    }

    handleChangeEmail(event) {
        this.setState({ enteredCode: event.target.value });
      }
    
    signIn = () => {
        if(this.state.enteredCode==this.props.returnValue)
        {
            console.log('haaaaaaaaa');
        }
        else{
            this.setState({
                error:"Incorrect Code"
            })
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
                                    <button class="btn float-right login_btn" onClick={this.verify}> Verify </button>
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

