import React, { Component } from 'react';


class Row extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: props.number,
    }
  }

  render() {
    return (
      <div className="table-row">{ this.props.children }</div>
    );
  }
}

export default Row;