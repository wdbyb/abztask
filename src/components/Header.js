import React from 'react';
import Button from './Button';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
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
      </header>
    );
  }
}

export default Header;
