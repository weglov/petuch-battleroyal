import React, { Component } from 'react';


class Counter extends Component {
  render() {
    return (
      <div className="app-header">
        <div className="app-header-score"></div>
        <div className="app-header-round">
          <span className="app-header-round--score">{ this.props.score }</span>
        </div>
        <div className="app-header-game">SCORE: { this.props.counter }</div>
      </div>
    );
  }
}

export default Counter;