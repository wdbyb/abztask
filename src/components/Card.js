import React from 'react';

const Card = (props) => {
  const { name, email, photo, position, phone } = props;

  return (
    <div className="card">
      <div className="card-image">
        <img
          width="70"
          height="70"
          src={photo || './assets/photo-cover.svg'}
          alt="Profile"
        />
      </div>
      <p className="card-title">{name}</p>
      <p className="card-text">{position}</p>
      <p className="card-text">{email}</p>
      <p className="card-text">{phone}</p>
    </div>
  );
};

export default Card;
