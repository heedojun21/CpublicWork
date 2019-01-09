import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';


class Practice extends Component {


    handleFormSubmit = ({ email, password }) => {
        console.log(email, password);
    }

    render() {

        const { handleSubmit, fields: { email, password }} = this.props;

        return (
            <div className="practiceFormContainer">
                <h1 className="practiceH1">C Public Exchange</h1>
                <h2 className="practiceH2">Crypto currency exchange company</h2>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="practiceFormBox"> 
                    <span className="practiceFormFieldSpan">
                        <label className="practiceFormFieldLabel">Question #1</label>
                        <input {...email} className="practiceFormfieldInput" />
                    </span>

                    <span className="practiceFormFieldSpan">
                        <label className="practiceFormFieldLabel">Question #2</label>
                        <input {...password} className="practiceFormfieldInput" />
                    </span>

                    <span className="practiceFormFieldSpan">
                        <label className="practiceFormFieldLabel">Question #3</label>
                        <select className="practiceFormfieldSelect">
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                        </select>
                    </span>

                    <span className="practiceFormFieldSpan">
                        <label className="practiceFormFieldLabel">Question #4</label>
                            <input name="q4" value="male" type="radio" className="practiceRadio"> Male</input>
                            <input name="q4" value="female" type="radio" className="practiceRadio"> Female</input>
                    </span>
                    <button action="submit" className="practiceFormButton">SIGN IN</button>
                </form>
            </div>
        );
    }

}


function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({
    form: 'practice',
    fields: ['email', 'password']
}, mapStateToProps, actions)(Practice);


