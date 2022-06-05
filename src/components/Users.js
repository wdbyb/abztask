import React from 'react';
import Card from './Card';
import Button from './Button';

const Users = (props) => {
  const { errorMessage, loading, nextUrl, onButtonClick, users } = props;

  const onBtnClick = () => {
    onButtonClick();
  };

  const renderError = () => {
    return <div className="error">{errorMessage}</div>;
  };

  const renderList = () => {
    return users.map((user) => {
      return <Card {...user} key={user.registration_timestamp + user.id} />;
    });
  };

  const renderLoader = () => {
    return (
      <div className="loader">
        <img src="./assets/preloader.svg" alt="Loader" />
      </div>
    );
  };

  return (
    <div className="users">
      <h2>Working with GET request</h2>
      <div className={`users-list ${errorMessage ? 'error' : ''}`}>
        {errorMessage ? renderError() : renderList()}
      </div>
      {loading ? renderLoader() : null}
      {nextUrl && !errorMessage ? (
        <Button buttonText="Show more" onClick={onBtnClick} />
      ) : null}
    </div>
  );
};

export default Users;
