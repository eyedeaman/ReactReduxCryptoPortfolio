import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { addCoin } from '../actions/index';

import './add_coin.css';

class AddCoin extends Component {
  renderField(field) {
    // Grab metadata from field
    const {
      meta: { touched, error }
    } = field;

    // If field is touched and has error then use has-danger
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        {/* 
                field.input is object that contains event handlers (onChange) and props
                Has value of input
                By using ... saying it's an object and want that communicated with input
                so we don't have to wire up each event handler
                */}
        <input className='form-control' type='text' {...field.input} />
        {/* 
                meta.error property is auto added to field object from validate function
                
                field.meta.touched tells us if a user entered the field then left
                
                This is ternary expression...if whatever before question mark is true 
                then whatever is between ? and : (field.meta.error )will be returned. 
                If false, whatever is after : will be returned ('')
                */}
        <div className='text-help'>{touched ? error : ''}</div>
      </div>
    );
  }

  // Formats coin values submitted and calls firebase service to add coin
  onSubmit(values) {
    values.ticker = values.ticker.toUpperCase(); // Capitalize ticker
    values.buyPrice = parseFloat(values.buyPrice).toFixed(8); // Store buy price at 8 decimal places

    this.props.addCoin(values, () => {
      // props.history is given to PostsNew component when
      // Route was added for the component in the src index.js file
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
        className='add_coin_form'
      >
        {/* 
                The Field component doesn't know how to produce JSX, just interact with Redux Form
                'component' prop adding in helps convert it to JSX to display 
                
                Not passing in this.renderTitleField() with parenthasis b/c this is just
                a reference to function so it can be re-run multiple times when Field re-renders

                Defining arbitrary text to be passes into renderField as label...
                Doesn't need to be 'label' could be anything e.g. 'fieldTitle'
                */}
        <Field label='Coin Ticker' name='ticker' component={this.renderField} />
        <Field label='Amount' name='amount' component={this.renderField} />
        <Field
          label='Puy Price (BTC)'
          name='buyPrice'
          component={this.renderField}
        />

        <button className='btn btn-danger add_coin_cancel'>
          <Link to='/'>Cancel</Link>
        </button>

        <button type='submit' className='btn btn-secondary add_coin_submit'>
          <span>Add Coin</span>
        </button>
      </form>
    );
    //   <div>
    //     <div className="cancel">
    //       <Link to="/">
    //         <button type="button" className="btn btn-secondary btn-block">
    //           Cancel
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
  }
}

// Part of reduxForm. Called whenever they hit submit as part of reduxForm function below
// Also must be called more often because error messages show as they enter in fields
function validate(values) {
  // Always start with empty object
  const errors = {};

  // Validate the inputs from 'values'

  // If title is blank OR if length is less than 3 characters
  // add a 'title' property to errors object
  if (!values.ticker) {
    errors.ticker = 'Enter a coin ticker!';
  }
  if (!values.amount || isNaN(values.amount)) {
    errors.amount = 'Enter an amount';
  }
  if (!values.buyPrice || isNaN(values.buyPrice)) {
    errors.buyPrice = 'Enter a buy price!';
  }

  // If empty object is returned redux form assumes form is fine to submit
  return errors;
}

// reduxForm similar to connect helper. Need to pass it a function
// Think of form function as name of the form that can be referenced elsewhere
// You can have forms share state by sharing references (multi page forms)
export default reduxForm({
  validate, //same as validate: 'validate'
  form: 'AddCoin'
})(
  connect(
    null,
    { addCoin }
  )(AddCoin)
);
