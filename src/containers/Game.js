import React, { Component } from 'react';
import Main from '../components/Main';

class App extends Component {
  render() {
    return (
      <div className="main">
        <Main store={this.props.store}/>
      </div>
    );
  }
}

export default App;
