import React, { Component } from "react";
import Joi from "joi-browser";
import CharityInput from "./../CharityInput/CharityInput";

class CharityForm extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) {
      return null;
    }

    const errors = {};

    error.details.forEach(error => {
      errors[error.path[0]] = error.message;
    });

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };

    data[input.name] = input.value;
    this.setState({ data, errors }, () => this.handleSelect(input.name));
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="edu-people-list-btn">
        {label}
      </button>
    );
  }

  renderInput(name, label, type) {
    const { data, errors } = this.state;
    return (
      <CharityInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderSelect(name, label, options, disabled) {
    const { data, errors } = this.state;
    return (
      <CharityInput
        name={name}
        value={data[name]}
        label={label}
        options={options}
        disabled={disabled}
        isSelect={true}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default CharityForm;
