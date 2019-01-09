import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import hello from 'hellojs';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { loginUserGoogle, loginUserFacebook, logoutUser } from '../../actions/index';

import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';



var online = function (session) {
    var currentTime = (new Date()).getTime() / 1000;
    return session && session.access_token && session.expires > currentTime;
};


class OAuthSign extends Component {

    constructor(props) {
        super(props)

        //state이 바뀌면 새로 rendering되니, logInState를 Header,와 app에서 변경되어 오는 것을 추가해두기. 
        //  this.state= {logInState : this.props.authPropFromHeader};



        this.state = {
            logInState: this.props.authPropFromHeader,
            EmailState: props.EmailProp, NameState: props.ProfName
        };

        this.logOutFunction = this.logOutFunction.bind(this);

    }

    logOutFunction() {

        this.props.logoutUser();
        this.props.action();

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.authenticated == false) {
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
        }
    }

    googleLogIn = () => {

        this.props.loginUserGoogle().then(function (response) {
            location.reload();
        });
    }

    facebookLogIn = () => {
        this.props.loginUserFacebook().then(function (response) {
            location.reload();
        });
    }

    emailLogin = () => {
        browserHistory.push('/emailSignUp');
    }


    renderLinks() {

        var a = true;

        if (a) {

            return (
                <div className="user-nav dropdown-content right-nav-logged-in" >
                    <a className="dropdown-content__loggedIn" href="http://www.bufollow.info" target="_blank" >
                        <svg className="right-nav__icon" >
                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-info"></use>
                        </svg>
                        Tutorial
                        </a>
                    <a className="dropdown-content__loggedIn" href="/userInformation">
                        <svg className="right-nav__icon" >
                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-cog"></use>
                        </svg>
                        Setting
                        </a>
                    <a className="dropdown-content__loggedIn" href="/sendFeedback">
                        <svg className="right-nav__icon" >
                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-envelop"></use>
                        </svg>
                        Feedback
                        </a>
                    <a className="dropdown-content__loggedIn" href="/" onClick={this.logOutFunction}>
                        <svg className="right-nav__icon" >
                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-exit"></use>
                        </svg>
                        Sign out
                    </a>
                </div>
            );
        } else {

            return (
                <div className="user-nav dropdown-content right-nav-logged-out">
                    <a className="dropdown-content__loggedOut" onClick={this.googleLogIn}>
                        <svg className="user-nav__icon google_icon" >
                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-google2"></use>
                        </svg>
                    </a>
                    <a className="dropdown-content__loggedOut" onClick={this.facebookLogIn}>
                        <svg className="user-nav__icon facebook_icon" >
                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-facebook2"></use>
                        </svg>
                    </a>
                </div>
            );
        }

    }


    render() {

        return (
            this.renderLinks()

        );

    }

}




function mapStateToProps(state) {

    return {
        authenticated: state.auth.authenticated,
      //  NotificationListProps: state.notificationListReducer
    };
}


function mapDispatchToProps(dispatch) {

    return bindActionCreators({ loginUserGoogle: loginUserGoogle, loginUserFacebook: loginUserFacebook, logoutUser: logoutUser }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(OAuthSign);
