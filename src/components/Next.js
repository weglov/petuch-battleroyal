import React, { Component } from 'react';


class Next extends Component {
  render() {
    return (
      <div className="app-footer">
        <div className="app-footer-next" onClick={this.props.onClick}>{this.props.text}</div>
      </div>
    );
  }
}

export default Next;