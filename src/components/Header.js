import React from 'react';
import Button from './Button';

const Header = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <a href="/" className="header-logo">
          <img width="104" height="26" src="./assets/Logo.svg" alt="Logo" />
        </a>
        <ul className="header-list">
          <li>
            <Button buttonText="Users" />
          </li>
          <li>
            <Button buttonText="Sign up" />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
