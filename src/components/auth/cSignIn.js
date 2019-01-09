import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const websocketForShift1 = new WebSocket("wss://apikachingprod.alphapoint.com/WSGateway/");



class CSignIn extends Component {


    constructor(props) {
        super(props);
        this.state = {
            username: '', password: ''
        };
    }



    componentDidMount() {

        websocketForShift1.onopen = (res) => {
            console.log('Websocket connected to Shift');
        };

    }

    componentWillReceiveProps(nextProps) {

        if(nextProps != undefined && 
            nextProps.usernameProp == 'cpublicadmin'){
            alert('hello! Cpublicadmin! Nice to meet you!');
            console.log('log in info:', nextProps.loginInfoProp);
        }
    }


    handleFormSubmit = (props) => {
        // Need to do something to log user in
        //this.props.signinUser({ username, password });

        if (websocketForShift1.readyState === websocketForShift1.OPEN) {

            var frame = { "m": 0, "i": 0, "n": 'WebAuthenticateUser', "o": '' };
            var requestPayload = { 'UserName': props.username, 'Password': props.password };

            frame.o = JSON.stringify(requestPayload);
            websocketForShift1.send(JSON.stringify(frame));


            websocketForShift1.onmessage = (e) => {
                console.log('message from shift1:', JSON.parse(e.data));
                var frame = JSON.parse(e.data);
                if (frame.m == 1) {
                    if (frame.n == "WebAuthenticateUser") {
                        var LoginReply = JSON.parse(frame.o);
                        if (LoginReply.Authenticated) {
                            var userID = LoginReply.UserId;
                            this.props.storeLoginInfo(LoginReply);
        
                            this.props.setUsername(props.username);
                        }
                    }
                }
            };

            websocketForShift1.onerror = (err) => { console.log('onerror', err) };

        };
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

    webSocketCall = () => {

        if (websocketForShift1.readyState === websocketForShift1.OPEN) {

            var frame = { "m": 0, "i": 0, "n": 'GetInstrument', "o": '' };
            var requestPayload = { "OMSId": 1, "InstrumentId": 2 };
//'UserName': 'cpublicadmin', 'Password': 'CpuBAdmin27%'
            frame.o = JSON.stringify(requestPayload);
            websocketForShift1.send(JSON.stringify(frame));


            websocketForShift1.onmessage = (e) => {
                let data = JSON.parse(e.data);

                console.log('message from websocket button:', data);
                console.log('o: ', data.o);
   
            };

            websocketForShift1.onerror = (err) => { console.log('onerror', err) };

        };
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div className="cpublicFormContainer">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="cpublicFormBox" >

                    <h1 className="cpublicFormH1">SIGN IN</h1>
                    <span className="cpublicFormFieldSpan ">
                        <label className="cpublicFormFieldLabel">Username:</label>

                        <Field
                            name="username"
                            component="input"
                            type="input"
                            placeholder="username"
                            className=" cpublicFormfieldInput"
                            onChange={(e) => this.setState({ username: e.target.value })}
                        />
                    </span>
                    <span className="cpublicFormFieldSpan ">
                        <label className="cpublicFormFieldLabel">Password:</label>
                        <Field
                            name="password"
                            component="input"
                            type="password"
                            placeholder="password"
                            className=" cpublicFormfieldInput"
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />

                    </span>
                    {this.renderAlert()}
                    <input type="button" value="websocket test" onClick={() => { this.webSocketCall() }} />
                    <button action="submit" className="cpublicFormButton">SIGN IN</button>
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
    form: 'cSignIn',
    fields: ['username', 'password']
  })(
    connect(mapStateToProps, actions)(CSignIn)
    );
  
  