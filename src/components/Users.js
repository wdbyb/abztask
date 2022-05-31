import React from 'react';
import Card from './Card';
import Button from './Button';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      nextUrl: '',
      defaultUrl:
        'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6',
    };
  }

  componentDidMount() {
    this.fetchUsers(this.state.defaultUrl, (data) =>
      this.setState({ users: data.users, nextUrl: data.links.next_url })
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldRerender !== prevProps.shouldRerender) {
      this.fetchUsers(this.state.defaultUrl);
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
          onSuccess(data);
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

  renderList() {
    return this.state.users.map((user) => {
      return <Card {...user} key={user.registration_timestamp + user.id} />;
    });
  }

  render() {
    return (
      <div className="users">
        <h2>Working with GET request</h2>
        <div className="users-list">{this.renderList()}</div>
        {this.state.nextUrl ? (
          <Button buttonText="Show more" onClick={this.onBtnClick} />
        ) : null}
      </div>
    );
  }
}

export default Users;
