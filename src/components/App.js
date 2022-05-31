import React from 'react';
import Header from './Header';
import Intro from './Intro';
import Users from './Users';
import Form from './Form';

class App extends React.Component {
  state = { shouldRerender: false };

  onSubmitSuccess = () => {
    this.setState({ shouldRerender: !this.state.shouldRerender });
  };

  render() {
    return (
      <div>
        <Header />
        <Intro />
        <Users shouldRerender={this.state.shouldRerender} />
        <Form onSubmitSuccess={this.onSubmitSuccess} />
      </div>
    );
  }
}

export default App;
