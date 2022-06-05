import React, { useState } from 'react';
import Tooltip from './Tooltip';

const Card = (props) => {
  const [imageSrc, setImageSrc] = useState(props.photo);

  return (
    <div className="card">
      <div className="card-image">
        <img
          width="70"
          height="70"
          src={imageSrc || './assets/photo-cover.svg'}
          alt="Profile"
          onError={() => setImageSrc('./assets/photo-cover.svg')}
        />
      </div>
      <p className="card-title">{props.name}</p>
      <p className="card-text">{props.position}</p>
      <Tooltip message={props.email}>
        <p className="card-text">{props.email}</p>
      </Tooltip>
      <p className="card-text">{props.phone}</p>
    </div>
  );
};

export default Card;
