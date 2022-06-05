import React, { useState, useEffect } from 'react';
import Header from './Header';
import Intro from './Intro';
import Users from './Users';
import Form from './Form';

const DEFAULT_URL =
  'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6';

const App = () => {
  const [users, setUsers] = useState([]);
  const [isUsersLoading, setIsUsersLoading] = useState(true);
  const [isUsersDefaultFetch, setIsUsersDefaultFetch] = useState(false);
  const [usersErrorMessage, setUsersErrorMessage] = useState('');
  const [nextURL, setNextURL] = useState('');
  const [positions, setPositions] = useState([]);
  const [positionsError, setPositionsError] = useState('');

  useEffect(() => {
    fetchUsers(
      DEFAULT_URL,
      (data) => {
        setUsers(data.users);
        setNextURL(data.links.next_url);
        setIsUsersLoading(false);
      },
      (data) => {
        setUsersErrorMessage(data.message);
        setIsUsersLoading(false);
      }
    );

    fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // process success response
          setPositions(data.positions);
          setPositionsError('');
        } else {
          setPositionsError('Positions error!');
        }
      });
  }, []);

  useEffect(() => {
    if (isUsersDefaultFetch) {
      setIsUsersLoading(true);
      setIsUsersDefaultFetch(false);

      fetchUsers(
        DEFAULT_URL,
        (data) => {
          setUsers(data.users);
          setNextURL(data.links.next_url);
          setIsUsersLoading(false);
        },
        () => {
          setUsersErrorMessage('Error! Error!');
          setIsUsersLoading(false);
        }
      );
    }
  }, [isUsersDefaultFetch]);

  const fetchUsers = (url, onSuccess, onError) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          // process success response
          if (onSuccess) {
            onSuccess(data);
          }
        } else {
          // proccess server errors
          onError(data);
        }
      });
  };

  const onButtonClick = () => {
    fetchUsers(nextURL, (data) => {
      setUsers([...users, ...data.users]);
      setNextURL(data.links.next_url);
    });
  };

  const onSubmitSuccess = () => {
    setIsUsersDefaultFetch(true);
  };

  return (
    <div>
      <Header />
      <Intro />
      <Users
        users={users}
        loading={isUsersLoading}
        usersErrorMessage={usersErrorMessage}
        nextUrl={nextURL}
        onButtonClick={onButtonClick}
      />
      <Form
        positions={positions}
        positionsError={positionsError}
        onSubmitSuccess={onSubmitSuccess}
      />
    </div>
  );
};

export default App;
