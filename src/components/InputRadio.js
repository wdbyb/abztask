import React from 'react';

const InputRadio = (props) => {
  const { id, name, value, defaultChecked, onChange } = props;

  return (
    <React.Fragment>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={id}>{value}</label>
    </React.Fragment>
  );
};

export default InputRadio;
