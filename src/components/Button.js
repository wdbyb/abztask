import React from 'react';

const Button = (props) => {
  return (
    <button
      className="button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;
