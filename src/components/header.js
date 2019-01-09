import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import OAuthSign from './auth/oauthSign';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import hello from 'hellojs'
import { browserHistory } from 'react-router';

import { bindActionCreators } from 'redux';

import ReactNotificationCenter from 'react-notification-center';


import Alert from 'react-s-alert';
// mandatory
import 'react-s-alert/dist/s-alert-default.css';


let requiredAuthStatVar = localStorage.getItem('RequiredAuthStat');

var online = function (session) {
    var currentTime = (new Date()).getTime() / 1000;
    return session && session.access_token && session.expires > currentTime;
};

const websocketForShift1 = new WebSocket("wss://apikachingprod.alphapoint.com/WSGateway/");


class Header extends Component {

    constructor(props) {
        super(props);

        this.notificationOptions = {
            id: 'notification_id',
            message: 'notification',
            new: 'active',
            tags: 'tags',
            date: 'created_time_show'
        };


        const prof = this.getProfile();



        this.state = { EmailState: prof.email, newAuthState: this.props.authPropFromApp, 
            usernameState: '' };

        this.handler = this.handler.bind(this);

        this.notificationClicked = this.notificationClicked.bind(this);

    }




    // This method will be sent to the child component
    handler() {
        this.setState({
            EmailState: ""
        });
    }


    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile');
        return profile ? JSON.parse(localStorage.profile) : {}
    }


    componentDidMount() {


    }

    componentWillReceiveProps(nextProps) {
        if (this.props.usernameProp != nextProps.usernameProp){
            this.setState({ usernameState: nextProps.usernameProp});
        }


    }

    notificationClicked(item) {


    }

    navToggled = () => {


    }

    testSignIn = () => {
        alert('hello!');
    }

    renderUl = () => {

        return (
            <ul className="user-nav ">
                <li className="user-nav"><a href="#">Company</a></li>
                <li className="user-nav"><a href="#">Products</a></li>
                <li className="user-nav"><a href="#">News</a></li>
                <li className="user-nav"><a href="#">Support</a></li>
            </ul>
        );

    }

    SignOut = () => {
        



        if (websocketForShift1.readyState === websocketForShift1.OPEN) {

            var frame = { "m": 0, "i": 0, "n": 'LogOut', "o": '' };
            var requestPayload = {  };

            frame.o = JSON.stringify(requestPayload);
            websocketForShift1.send(JSON.stringify(frame));


            websocketForShift1.onmessage = (e) => {
 
                var frame = JSON.parse(e.data);

                var LogoutReply = JSON.parse(frame.o);

                if(LogoutReply.result){
                    localStorage.removeItem('username');
                    localStorage.removeItem('SessionToken');
                    this.setState({ usernameState: '' });
                }

            };

            websocketForShift1.onerror = (err) => { console.log('onerror', err) };

        };
        browserHistory.push('/cSignIn');
  
    }

    renderRightHeader = () => {


        let username = localStorage.getItem('username');

        if (this.state.usernameState == '' ) {
            return (
                <div className="right_nav">
                <ul className="right_nav_ul">
                    <li className="right_nav_li"><a href="/cSignIn">Sign In</a></li>
                    <li className="right_nav_li"><a href="/cSignUp">Register</a></li>
                </ul>
            </div>
            );
        }

        return (
            <div className="right_nav">
            <ul className="right_nav_ul">
            <li className="right_nav_li"><a href="#">Welcome, {this.state.usernameState}</a></li>
                <li className="right_nav_li">
                <input type="button" 
                value="Sign Out"
                onClick={()=> this.SignOut()}
                />
            </li>
            </ul>
        </div>
        );

    }



    render() {
        return (
            <header className="header big-screen-nav">
              <a href="/"><img src="../style/img/CPublicExchange.png" alt="bufollow logo" className="logo"/></a>
              {this.renderUl()} 

              {this.renderRightHeader()}
              
            </header>);
    }
}



function mapStateToProps(state) {

    return {
        usernameProp: state.set_username,

    };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);



/*

 var gl = hello('google').getAuthResponse();
        var fc = hello('facebook').getAuthResponse();

        let onlineStatBool = false;

        if (online(gl) || online(fc)) {
            onlineStatBool = true;
        } else {
     
            if(this.state.EmailState != "" && this.state.EmailState != undefined ){
                onlineStatBool = true;
            }
        }
        //this.state.EmailState != "" && this.state.EmailState != undefined && this.state.EmailState != null 

        let authToken =  localStorage.getItem('token');

       
        if (onlineStatBool) {

            return (

                <div>
                    <header className="header big-screen-nav">
                        <img src="../style/img/cpublic_gold.png" alt="bufollow logo" className="logo" />
                        {authToken != null ? this.renderUl() : undefined} 

                        <div className="right_nav">
                            {this.state.EmailState != "" && this.state.notifications != null && this.state.notifications != undefined ? //&& this.state.EmailState != <div /> 

                                <ReactNotificationCenter
                                    notifications={this.state.notifications}
                                    //   onNotificationOpen={() => console.log('Notification has open')}
                                    //  onNotificationClose={() => console.log('Notification has close')}
                                    onItemClick={(item) => this.notificationClicked(item)}
                                    //   onScroll={() => console.log('You are scrolling')}
                                    //   onScrollBottom={() => console.log('you are on the bottom')}
                                    mapToItem={this.notificationOptions} />

                                :
                                undefined
                            }

                            <div className="dropdown" >

                                <button className="dropbtn">
                                    {requiredAuthStatVar == "true" && (onlineStatBool) ?
                                        <svg className="dropbtn__icon" >
                                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-user"></use>
                                        </svg>
                                        :
                                        <svg className="dropbtn__icon" >
                                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-enter"></use>
                                        </svg>
                                    }

                                </button>
                                <OAuthSign action={this.handler} authPropFromHeader={this.state.newAuthState} EmailProp={this.state.EmailState} />
                            </div>
                        </div>


                    </header>



                    <header className="header small-screen-nav">


                        <input type="checkbox" checked={this.state.naviToggleState} className="small-screen-nav__checkbox" id="navi-toggle" />


                        <img src="../style/img/cpublic_gold.png" alt="bufollow logo" className="logo" />
                        {requiredAuthStatVar == "true" && (onlineStatBool) ?
                            <div id="navToggle">
                                <a href="#" onClick={() => this.navToggled()}>

                                    <svg className="small-screen-nav__svgIcon menuUp" id="circle-up">
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-circle-up"></use>
                                    </svg>

                                    <svg className="small-screen-nav__svgIcon menuDown" id="circle-down">
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-circle-down"></use>
                                    </svg>

                                </a>
                            </div>
                            : undefined}

                        <div className="right_nav">
                            {this.state.EmailState != ""  && this.state.notifications != null && this.state.notifications != undefined ? //&& this.state.EmailState != <div /> 

                                <ReactNotificationCenter
                                    notifications={this.state.notifications}
                                    //   onNotificationOpen={() => console.log('Notification has open')}
                                    //  onNotificationClose={() => console.log('Notification has close')}
                                    onItemClick={(item) => this.notificationClicked(item)}
                                    //   onScroll={() => console.log('You are scrolling')}
                                    //   onScrollBottom={() => console.log('you are on the bottom')}
                                    mapToItem={this.notificationOptions} />

                                :
                                undefined
                            }

                            <div className="dropdown" >

                                <button className="dropbtn">
                                    {requiredAuthStatVar == "true" && (onlineStatBool) ?
                                        <svg className="dropbtn__icon" >
                                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-user"></use>
                                        </svg>
                                        :
                                        <svg className="dropbtn__icon" >
                                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-enter"></use>
                                        </svg>
                                    }

                                </button>
                                <OAuthSign action={this.handler} authPropFromHeader={this.state.newAuthState} EmailProp={this.state.EmailState} />
                            </div>
                        </div>


                    </header>


                    <ul className="menuUp small-nav-dropdown" id="small-nav-dropdown" >
                        <li className="small-nav-li" id="dropbtn__start">
                            <a className="dropbtn"  >START</a>
                            <div className="small-nav-dropdown-content" id="small-nav-dropdown-content__start">
                                <a href="/SetDoGoal">
                                    <svg className="side-nav__svgIconS" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-medal2"></use>
                                    </svg>
                                    SELF-DISCIPLINE</a>
                                <a href="/SetNoGoal">
                                    <svg className="side-nav__svgIconS" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-medal"></use>
                                    </svg>
                                    SELF-CONTROL</a>
                            </div>
                        </li>


                        <li className="small-nav-li" id="dropbtn__diary">
                            <a className="dropbtn">DIARY</a>
                            <div className="small-nav-dropdown-content" id="small-nav-dropdown-content__diary">
                                <a href="/doDiaryForm">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-pencil"></use>
                                    </svg>
                                    SELF-DISCIPLINE DIARY</a>
                                <a href="/NoDiarySelector">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-pencil2"></use>
                                    </svg>
                                    SELF-CONTROL DIARY</a>
                                <a href="/separateMediaDiary">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-camera"></use>
                                    </svg>MEDIA DIARY</a>
                                <a href="/recordForm">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-stats-dots"></use>
                                    </svg>RECORD</a>
                                <a href="/setNote">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-wallet"></use>
                                    </svg>NOTE</a>
                                <a href="/resourceInsert">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-bookmark"></use>
                                    </svg>RESOURCE</a>
                                <a href="/stepDone">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-list-numbered"></use>
                                    </svg>STEP MANAGEMENT</a>
                                <a href="/taskListUpload">
                                    <svg className="side-nav__svgIconS" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-clipboard"></use>
                                    </svg>PRE-BUILT TASKS</a>
                                <a href="/showTaskListTable">
                                    <svg className="side-nav__svgIconS" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-clipboard3"></use>
                                    </svg>TASK LIST MANAGEMENT</a>
                            </div>
                        </li>
                        <li className="small-nav-li" id="dropbtn__report">
                            <a className="dropbtn" >REPORT</a>
                            <div className="small-nav-dropdown-content" id="small-nav-dropdown-content__report">
                                <a href="/doReport">
                                    <svg className="side-nav__svgIconS" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-book2"></use>
                                    </svg>SELF-DISCIPLINE REPORT</a>
                                <a href="/doDailyReport">
                                    <svg className="side-nav__svgIconS" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-calendar"></use>
                                    </svg>SELF-DISCIPLINE CALENDAR</a>
                                <a href="/noReport">
                                    <svg className="side-nav__svgIconS" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-book3"></use>
                                    </svg>SELF-CONTROL REPORT</a>
                                <a href="/noDailyReport">
                                    <svg className="side-nav__svgIconS" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-calendar2"></use>
                                    </svg>SELF-CONTROL CALENDAR</a>
                                <a href="/imageShow">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-images"></use>
                                    </svg>IMAGE REPORT</a>
                                <a href="/videoShow">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-film"></use>
                                    </svg>VIDEO REPORT</a>
                                <a href="/resourceList">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-bookmark3"></use>
                                    </svg>RESOURCE LIST</a>
                                <a href="/recordGraph">
                                    <svg className="side-nav__svgIconS" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-stats"></use>
                                    </svg>RECORD GRAPH</a>
                                <a href="/noteListView">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-book"></use>
                                    </svg>NOTE LIST</a>
                            </div>
                        </li>


  
                        <li className="small-nav-li" id="dropbtn__inspiration">
                            <a className="dropbtn" >OUTCOME</a>
                            <div className="small-nav-dropdown-content" id="small-nav-dropdown-content__inspiration">
                                <a href="/inspirationList">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-library"></use>
                                    </svg>INSPIRATION LIST</a>
                                <a href="/myInspirationList">
                                    <svg className="side-nav__svgIcon" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-fire"></use>
                                    </svg>MY INSPIRATIONS</a>
                                <a href="/bufollowInspirationList">
                                    <svg className="side-nav__svgIconS" >
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-graduate"></use>
                                    </svg>MY GUIDES</a>
                            </div>
                        </li>
                    </ul>

                    <Alert stack={{ limit: 1 }} />
                </div>
            );
        } else { 
            return (

                <div>
                    <header className="header big-screen-nav">
                        <img src="../style/img/cpublic_gold.png" alt="bufollow logo" className="logo" />


                        <div className="right_nav">

                            <div className="dropdown" >

                                <button className="dropbtn">
                                    {requiredAuthStatVar == "true" && (onlineStatBool) ?
                                        <svg className="dropbtn__icon" >
                                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-user"></use>
                                        </svg>
                                        :
                                        <svg className="dropbtn__icon" >
                                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-enter"></use>
                                        </svg>
                                    }

                                </button>
                                <OAuthSign action={this.handler} authPropFromHeader={this.state.newAuthState} EmailProp={this.state.EmailState} />
                            </div>
                        </div>


                    </header>



                    <header className="header small-screen-nav">


                        <input type="checkbox" checked={this.state.naviToggleState} className="small-screen-nav__checkbox" id="navi-toggle" />


                        <img src="../style/img/cpublic_gold.png" alt="bufollow logo" className="logo" />
                        {requiredAuthStatVar == "true" && (onlineStatBool) ?
                            <div id="navToggle">
                                <a href="#" onClick={() => this.navToggled()}>

                                    <svg className="small-screen-nav__svgIcon menuUp" id="circle-up">
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-circle-up"></use>
                                    </svg>

                                    <svg className="small-screen-nav__svgIcon menuDown" id="circle-down">
                                        <use xlinkHref="../style/img/bufollow_icons.svg#icon-circle-down"></use>
                                    </svg>

                                </a>
                            </div>
                            : undefined}

                        <div className="right_nav">

                            <div className="dropdown" >

                                <button className="dropbtn">
                                    {requiredAuthStatVar == "true" && (onlineStatBool) ?
                                        <svg className="dropbtn__icon" >
                                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-user"></use>
                                        </svg>
                                        :
                                        <svg className="dropbtn__icon" >
                                            <use xlinkHref="../style/img/bufollow_icons.svg#icon-enter"></use>
                                        </svg>
                                    }

                                </button>
                                <OAuthSign action={this.handler} authPropFromHeader={this.state.newAuthState} EmailProp={this.state.EmailState} />
                            </div>
                        </div>


                    </header>

                    <Alert stack={{ limit: 1 }} />
                </div>
            );
        } 

    
*/