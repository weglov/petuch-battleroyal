import React, { Component } from 'react';
import Main from '../components/Main';

class App extends Component {
  next = () => this.props.store.dispatch({ type: 'G_INIT_GAME' })

  render() {
    return (
      <div className="main">
        <Main store={this.props.store} next={ this.next }/>
      </div>
    );
  }
}

export default App;
