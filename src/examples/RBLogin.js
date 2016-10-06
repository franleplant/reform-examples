import React, { Component } from 'react';
import {Panel, Alert, Button, Form, FormGroup, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import Reform from '@franleplant/reform';

export default class RBLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        username: '',
        password: '',
        tos: false,
      },

      errors: null,
    }
  }

  handleFieldChange(fieldName, control, event) {
    this.setState(state => {
      state.fields[fieldName] = control.value;
      state.errors = null;
      return state
    })
  }

  handleSubmit(form, event) {
    event.preventDefault();
    this.setState(state => {
      state.errors = form.getErrorMap();
      return state
    });

    if (!form.isValid()) {
      console.log("FORM NOT VALID ")
    }
  }
  render() {
    const {fields, errors} = this.state;


    const autocontrol = fieldName => {
      return ({
        name: fieldName,
        value: fields[fieldName],
        onChange: this.handleFieldChange.bind(this, fieldName),
      })
    }

    const getValidationState = fieldName => {

      let state;

      if (!errors) {
        state =  null;
      } else if (errors[fieldName].isInvalid) {
        state = 'error';
      } else if (errors[fieldName].isValid()) {
        state = 'success'
      }

      return {
        validationState: state,
      }
    }

    /*
     *  In here you can see several ways of managing the actual display of the errors.
     *  Error is simple and works well but you need to check that `this.state.errors is something`
     *
     *  On the otherside Error2 is more complex but handles the object checking for you
     *
     *  The important part here is that you can do a lot of abstractions here that are suitable for you
     */

    const Error = ({cond, children}) => {
      if (!cond) {
        return null;
      }

      return <Alert bsStyle="danger">{children}</Alert>;
    }

    const Error2 = ({error, children}) => {
      try {
        const [fieldName, errorKey] = error.split('.');
        if (!this.state.errors[fieldName][errorKey]) {
          return null;
        }

        return <Alert bsStyle="danger">{children}</Alert>;

      } catch (err) {
        return null;
      }
    }

    return (
      <Panel header="React Bootstrap integration">
        <Reform>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup {...getValidationState('username')}>
              <ControlLabel>Username</ControlLabel>
              <FormControl type="text" placeholder="username" minLength="3" required {...autocontrol('username')} />
              <Error cond={errors && errors.username.minLength}>
                User Name should have at least 3 characters
              </Error>
              <Error cond={errors && errors.username.required}>
                User Name is required
              </Error>
            </FormGroup>

            <FormGroup {...getValidationState('username')}>
              <ControlLabel>Password</ControlLabel>
              <FormControl type="password" placeholder="password" minLength="6" required {...autocontrol('password')} />
              <Error2 error="password.minLength">
                Password should have at least 6 characters
              </Error2>
              <Error2 error="password.required">
                Password is required
              </Error2>
            </FormGroup>

            <FormGroup {...getValidationState('tos')}>
              <ControlLabel>TOS</ControlLabel>
              <Checkbox required name="tos" checked={fields.tos} onChange={control => this.setState(state => {
                state.fields.tos = control.checked
                state.errors = null;
                return state;
              })} />
              <Error2 error="tos.required">
                TOS aceptance is required
              </Error2>
            </FormGroup>

            <Button type="submit">Submit</Button>
          </Form>
        </Reform>
      </Panel>
    );
  }
}
