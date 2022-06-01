import React from 'react';
import Card from './Card';
import Button from './Button';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      errorMessage: '',
      users: [],
      nextUrl: '',
      defaultUrl:
        'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6',
    };
  }

  componentDidMount() {
    this.fetchUsers(
      this.state.defaultUrl,
      (data) =>
        this.setState({
          users: data.users,
          nextUrl: data.links.next_url,
          loading: false,
        }),
      (data) => this.setState({ errorMessage: data.message, loading: false })
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.isDefaultFetch !== prevProps.isDefaultFetch) {
      this.setState({ loading: true });

      this.fetchUsers(
        this.state.defaultUrl,
        (data) =>
          this.setState({
            users: data.users,
            nextUrl: data.links.next_url,
            loading: false,
          }),
        () => this.setState({ errorMessage: 'Error', loading: false })
      );
    }
  }

  fetchUsers = (url, onSuccess, onError) => {
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

  onBtnClick = () => {
    this.fetchUsers(this.state.nextUrl, (data) =>
      this.setState({
        users: [...this.state.users, ...data.users],
        nextUrl: data.links.next_url,
      })
    );
  };

  renderError() {
    return <div className="error">{this.state.errorMessage}</div>;
  }

  renderList() {
    return this.state.users.map((user) => {
      return <Card {...user} key={user.registration_timestamp + user.id} />;
    });
  }

  renderLoader() {
    return (
      <div className="loader">
        <img src="./assets/preloader.svg" alt="Loader" />
      </div>
    );
  }

  render() {
    return (
      <div className="users">
        <h2>Working with GET request</h2>
        <div className={`users-list ${this.state.errorMessage ? 'error' : ''}`}>
          {this.state.errorMessage ? this.renderError() : this.renderList()}
        </div>
        {this.state.loading ? this.renderLoader() : null}
        {this.state.nextUrl && !this.state.errorMessage ? (
          <Button buttonText="Show more" onClick={this.onBtnClick} />
        ) : null}
      </div>
    );
  }
}

export default Users;
