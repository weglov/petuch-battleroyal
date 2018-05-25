import React, { Component } from 'react';


class Logout extends Component {
  render() {
    return <div className="logout" onClick={this.props.logout}></div>
  }
};

export default Logout;
