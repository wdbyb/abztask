import React from 'react';
import Header from './Header';
import Intro from './Intro';
import Users from './Users';
import Form from './Form';

class App extends React.Component {
  state = { isDefaultFetch: false };

  onSubmitSuccess = () => {
    this.setState({ isDefaultFetch: !this.state.isDefaultFetch });
  };

  render() {
    return (
      <div>
        <Header />
        <Intro />
        <Users isDefaultFetch={this.state.isDefaultFetch} />
        <Form onSubmitSuccess={this.onSubmitSuccess} />
      </div>
    );
  }
}

export default App;
