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
      <tr className="table-row">{ this.props.children }</tr>
    );
  }
}

export default Row;