/* eslint-disable react/prop-types */
/* eslint-disable max-classes-per-file */
import React from 'react';
import Select from 'react-select';
import { CustomInput } from 'reactstrap';

import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class FormikReactSelect extends React.Component {
  handleChange = (value) => {
    this.props.onChange(this.props.name, value);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <Select
        className={`react-select ${this.props.className}`}
        classNamePrefix="react-select"
        options={this.props.options}
        isMulti={this.props.isMulti}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value}
      />
    );
  }
}

class FormikCheckboxGroup extends React.Component {
  handleChange = (val) => {
    const valueArray = [...this.props.value] || [];
    if (!valueArray.includes(val)) {
      valueArray.push(val);
    } else {
      valueArray.splice(valueArray.indexOf(val), 1);
    }
    this.props.onChange(this.props.name, valueArray);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, options, inline = false } = this.props;
    return (
      <>
        {options.map((child, index) => (
          <div
            key={`${name}_${child.value}_${index}`}
            className={`position-relative form-check ${
              inline ? 'form-check-inline' : ''
            }`}
          >
            <input
              id={child.value}
              name={name}
              type="checkbox"
              className="form-check-input"
              onChange={() => this.handleChange(child.value)}
              onBlur={this.handleBlur}
              defaultChecked={value.includes(child.value)}
              disabled={child.disabled}
            />
            <label className="form-check-label">{child.label}</label>
          </div>
        ))}
      </>
    );
  }
}

class FormikCustomCheckboxGroup extends React.Component {
  handleChange = (val) => {
    const valueArray = [...this.props.value] || [];
    if (!valueArray.includes(val)) {
      valueArray.push(val);
    } else {
      valueArray.splice(valueArray.indexOf(val), 1);
    }
    this.props.onChange(this.props.name, valueArray);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, options, inline = false } = this.props;
    return (
      <>
        {options.map((child, index) => (
          <CustomInput
            key={`${name}_${child.value}_${index}`}
            type="checkbox"
            id={`${name}_${child.value}_${index}`}
            name={child.name}
            label={child.label}
            onChange={() => this.handleChange(child.value)}
            onBlur={this.handleBlur}
            checked={value.includes(child.value)}
            disabled={child.disabled}
            inline={inline}
          />
        ))}
      </>
    );
  }
}

const FormikCheckbox = (props) => {
  const handleChange = () => {
    props.onChange(props.name, !props.value);
  };
  const handleBlur = () => {
    props.onBlur(props.name, true);
  };
  return (
    <div className="position-relative form-check form-check-inline">
      <input
        name={props.name}
        type="checkbox"
        className="form-check-input"
        onChange={handleChange}
        onBlur={handleBlur}
        checked={props.value}
        disabled={props.disabled}
      />
      <label className="form-check-label">{props.label}</label>
    </div>
  );
};

const FormikCustomCheckbox = (props) => {
  const handleChange = () => {
    props.onChange(props.name, !props.value);
  };
  const handleBlur = () => {
    props.onBlur(props.name, true);
  };
  return (
    <CustomInput
      type="checkbox"
      id={props.name}
      name={props.name}
      label={props.label}
      onChange={handleChange}
      onBlur={handleBlur}
      checked={props.value}
      disabled={props.disabled}
      inline
    />
  );
};

class FormikRadioButtonGroup extends React.Component {
  handleChange = (val) => {
    this.props.onChange(this.props.name, val);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, options, inline = false } = this.props;
    return (
      <>
        {options.map((child, index) => (
          <div
            key={`${name}_${child.value}_${index}`}
            className={`position-relative form-check ${
              inline ? 'form-check-inline' : ''
            }`}
          >
            <input
              id={child.value}
              name={name}
              type="radio"
              className="form-check-input"
              onChange={() => this.handleChange(child.value)}
              onBlur={this.handleBlur}
              defaultChecked={value === child.value}
              disabled={child.disabled}
            />
            <label className="form-check-label">{child.label}</label>
          </div>
        ))}
      </>
    );
  }
}

class FormikCustomRadioGroup extends React.Component {
  handleChange = (val) => {
    this.props.onChange(this.props.name, val);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, options, inline = false } = this.props;
    return (
      <>
        {options.map((child, index) => (
          <CustomInput
            key={`${name}_${child.value}_${index}`}
            type="radio"
            id={`${name}_${child.value}_${index}`}
            name={child.name}
            label={child.label}
            onChange={() => this.handleChange(child.value)}
            onBlur={this.handleBlur}
            checked={value === child.value}
            disabled={child.disabled}
            inline={inline}
          />
        ))}
      </>
    );
  }
}

class FormikTagsInput extends React.Component {
  handleChange = (val) => {
    this.props.onBlur(this.props.name, true);
    this.props.onChange(this.props.name, val);
  };

  render() {
    const { name, value } = this.props;
    return (
      <TagsInput
        id={name}
        name={name}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

class FormikSwitch extends React.Component {
  handleChange = (val) => {
    this.props.onBlur(this.props.name, true);
    this.props.onChange(this.props.name, val);
  };

  render() {
    const { name, value, className } = this.props;
    return (
      <Switch
        id={name}
        name={name}
        className={className}
        checked={value}
        onChange={this.handleChange}
      />
    );
  }
}

class FormikDatePicker extends React.Component {
  handleChange = (val) => {
    this.props.onChange(this.props.name, val);
  };

  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    const { name, value, className } = this.props;
    return (
      <DatePicker
        id={name}
        name={name}
        className={className}
        selected={value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

export {
  FormikReactSelect,
  FormikCheckboxGroup,
  FormikCustomCheckboxGroup,
  FormikCheckbox,
  FormikCustomCheckbox,
  FormikRadioButtonGroup,
  FormikCustomRadioGroup,
  FormikTagsInput,
  FormikSwitch,
  FormikDatePicker,
};
