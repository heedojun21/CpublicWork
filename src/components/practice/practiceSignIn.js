import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';



class PracticeSignIn extends Component {
  handleFormSubmit({ email, password }) {
    // Need to do something to log user in
    this.props.signinUser({ email, password });
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
      <Card className="practiceCard">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="cpublicFormBox" >

          <h1 className="cpublicFormH1">SIGN IN</h1>
          <span className="cpublicFormFieldSpan ">
            <label className="cpublicFormFieldLabel">Email:</label>
            <input {...email} className=" cpublicFormfieldInput" />
          </span>
          <span className="cpublicFormFieldSpan ">
            <label className="cpublicFormFieldLabel">Password:</label>
            <input {...password} type="password" className=" cpublicFormfieldInput" />
          </span>
          {this.renderAlert()}
          <button action="submit" className="cpublicFormButton">SIGN IN</button>
        </form>
      </Card>

    );
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'practiceSignIn',
  fields: ['email', 'password']
}, mapStateToProps, actions)(PracticeSignIn)




