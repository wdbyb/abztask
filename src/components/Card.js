import React from 'react';
import Tooltip from './Tooltip';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      src: props.photo,
    };
  }

  render() {
    return (
      <div className="card">
        <div className="card-image">
          <img
            width="70"
            height="70"
            src={this.state.src || './assets/photo-cover.svg'}
            alt="Profile"
            onError={() => this.setState({ src: './assets/photo-cover.svg' })}
          />
        </div>
        <p className="card-title">{this.props.name}</p>
        <p className="card-text">{this.props.position}</p>
        <Tooltip message={this.props.email}>
          <p className="card-text">{this.props.email}</p>
        </Tooltip>
        <p className="card-text">{this.props.phone}</p>
      </div>
    );
  }
}

export default Card;
