import React from 'react';

const Input = (props) => {
  return (
    <div
      className={`input ${props.value.length ? 'filled' : ''} ${
        props.error.length ? 'error' : ''
      }`}
    >
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        noValidate
      />
      <label htmlFor={props.id}>{props.label}</label>
      <div className="input-helper">{props.helperText || props.error}</div>
    </div>
  );
};

export default Input;
