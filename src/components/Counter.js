import React, { Component } from 'react';


class Counter extends Component {
  render() {
    return (
      <div className="app-header">
        <div className="app-header-score"></div>
        <div className="app-header-round">{ this.props.counter }</div>
        <div className="app-header-game"></div>
      </div>
    );
  }
}

export default Counter;