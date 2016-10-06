import React, { Component } from 'react';
import { Panel, FormControl } from 'react-bootstrap';
import Reform from '@franleplant/reform';

export default class Select extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fields: {
        food: '',
      },

      errors: {
        food: ''
      },
    }
  }

  handleFieldChange(fieldName, control, event) {
    this.setState(state => {
      state.fields[fieldName] = control.value;
      state.errors[fieldName] = control.errors;
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
      alert("FORM NOT VALID ")
    }
  }
  render() {
    const {fields, errors} = this.state;


    const autocontrol = fieldName => {
      return ({
        name: fieldName,
        value: fields[fieldName],
        onChange: this.handleFieldChange.bind(this, fieldName),
        style: {
          borderColor: errors[fieldName] && errors[fieldName].isInvalid ? 'red' : null,
        },
      })
    }

    return (
      <Panel header="Works on Select boxes too">
        <Reform>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              <FormControl componentClass="select" required {...autocontrol('food')}>
                <option value="" disabled></option>
                <option value="pizza">Pizza</option>
                <option value="hot dogs">Hot Dogs</option>
                <option value="cake">Cake</option>
              </FormControl>
              {errors.food && errors.food.required ? <p>Food is Required</p> : null}
            </div>

            <button type="submit">Submit</button>
          </form>
        </Reform>
      </Panel>
    );
  }
}
