import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { checkPropTypes } from 'prop-types';

const websocketForShift1 = new WebSocket("wss://apikachingprod.alphapoint.com/WSGateway/");


class CSignUp extends Component {

    state = { username: '', email: '', password: '' }

    componentDidMount() {
        websocketForShift1.onopen = (res) => { 
            console.log('Websocket connected to Shift');
        }
    }

    handleFormSubmit = ({ username, email, password }) => {
        console.log('username: ', username);
        console.log('email: ', email);
        console.log('password: ', password);

        if (websocketForShift1.readyState === websocketForShift1.OPEN){

            var frame = { "m": 0, "i": 0, "n": "RegisterNewUser", "o": ''};
            var requestPayload = { 
                "userInfo": {'UserName': username, 'emails': email, 'password': password},
            "OperatorId": 1, "UserConfig": [] 
             }
                
             frame.o = JSON.stringify(requestPayload);
             websocketForShift1.send(JSON.stringify(frame));

             websocketForShift1.onmessage = (e) => {
                 console.log('message from shift1: ', JSON.parse(e.data));
                 var frame = JSON.parse(e.data);
                 console.log('User ID: ', frame.UserID);
             }

             websocketForShift1.onerror = (err) => { console.log('onerror', err) };

        }

    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className=" alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            );
        }
    }


    render() {

        const { handleSubmit, fields: { email, password } } = this.props;


        return (
            <div className="cpublicFormContainer2">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="cpublicFormBox2">
                    <h1 className="cpublicFormH12">SIGN UP</h1>
                    <span className="cpublicFormFieldSpan2">
                        <label className="cpublicFormFieldLabel2">Username:</label>
                            <Field name="username"
                            component="input"
                            type="input"
                            placeholder="username"
                            className="cpublicFormfieldInput2"
                            onChange={(e) => this.setState({ username: e.target.value })}
                            />

                    </span>
                    <span className="cpublicFormFieldSpan2">
                        <label className="cpublicFormFieldLabel2">Email:</label>
                            <Field name="email"
                            component="input"
                            type="email"
                            placeholder="emails@email.com"
                            className="cpublicFormfieldInput2"
                            onChange={(e) => this.setState({ emails: e.target.value })}
                            />    
                    </span>
                    <span className="cpublicFormFieldSpan2">
                        <label className="cpublicFormFieldLabel2">Password:</label>
                        <Field name="password"
                        component="input"
                        type="password"
                        placeholder="password"
                        className="cpublicFormfieldInput2"
                        onChange={(e) => this.setState({ password: e.target.value })}
                        />
                    </span>


                    {this.renderAlert()}
                    <button action="submit" className="cpublicFormButton2">SIGN UP</button>
                </form>
            </div>
        );
    }

}


function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.error,
        usernameProp: state.set_username,
        loginInfoProp: state.store_login_info
    };
}


export default reduxForm({
    form: 'cSignUp',
    fields: ['username', 'password']
})(
    connect(mapStateToProps, actions)(CSignUp)
);






  