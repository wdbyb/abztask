import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <button
        className="button"
        onClick={this.props.onClick}
        disabled={this.props.disabled}
      >
        {this.props.buttonText}
      </button>
    );
  }
}

export default Button;
