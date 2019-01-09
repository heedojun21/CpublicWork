import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../actions';

import { browserHistory } from 'react-router';

const websocketForShift1 = new WebSocket("wss://apikachingprod.alphapoint.com/WSGateway/");



class Welcome extends Component {


    componentDidMount() {

        websocketForShift1.onopen = (res) => {
            console.log('Websocket connected to Shift');
        };

    }


    webSocketCall = () => {

        if (websocketForShift1.readyState === websocketForShift1.OPEN) {

            var frame = { "m": 0, "i": 0, "n": 'GetAccountInfo', "o": '' };
            var requestPayload = { "OMSId": 0, "AccountId": 0, "AccountHandle": "" };
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
        const { handleSubmit, fields: { email, password } } = this.props;

        return (
            <div className="welcomeDiv">
                <h1 className="welcomeContents">Buy and Sell Crypto currency</h1>
                <h3 className="welcomeContents">CPublic is the easiest place to buy, sell, and manage your cryptocurrency portfolio.</h3>
               

                <input type="submit" value="Register Now!" 
                  onClick={() => browserHistory.push('/cSignUp')}
                  id="welcomeButton"
                  className="welcomeContents" />


                                  <input type="submit" value="SignIn!" 
                  onClick={() => browserHistory.push('/cSignIn')}
                  id="welcomeButton"
                  className="welcomeContents" />


                <input type="button" value="websocket test" onClick={() => { this.webSocketCall() }} />

                <div className="welcomeRow">
                    <div className="col span-1-of-4 box">
                        <h3>SETTING STANDARDS</h3>
                        <p>complaint with leading examples of best practice.</p>
                    </div>
                    <div className="col span-1-of-4 box">
                    <h3>NO HIDDEN FEES</h3>
                        <p>Transparent volume-based pricing with no hidden fees.</p>
                    </div>
                    <div className="col span-1-of-4 box">
                    <h3>INSTANT TRADING</h3>
                        <p>Trade instantly - all major credit cards are supported.</p>
                    </div>
                    <div className="col span-1-of-4 box">
                    <h3>SECURE AND TRANSPARENT</h3>
                        <p>90% of digital funds stored offline. Subject to yearly audit by one of the Big Four.</p>
                    </div>
                
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'welcome',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Welcome);



/*

import React from 'react';

export default () => <div className="welcome" style={{ position: "relative" }}>

</div>;



 <input className="welcomeButton" type="button" value="Register Now!" onClick="alert('hello');"></input>
                <button className="welcomeButton"  onClick={alert('hello')}/>
*/