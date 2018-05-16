import React, { Component } from 'react';


class Next extends Component {
  render() {
    return (
      <div className="app-footer" onClick={this.props.onClick}>{this.props.text}</div>
    );
  }
}

export default Next;