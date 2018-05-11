import React, { Component } from 'react';


class Node extends Component {
  constructor(props) {
    super(props);
    const { name, parent, position, type, branches } = this.props.block;
    this.state = {
      name,
      parent,
      position,
      type,
      branches,
    }
  }

  get active() {
    return this.props.block.branches ? 'table-block__active' : ''
  }

  render() {
    return (
      <div key={this.state.name} className={
        "table-node--" + this.state.parent + " table-block table-block_parent " + this.active 
      }>
        <div alt={this.state.name}>
          <span role="img" row={this.state.name} aria-label={this.state.position}>
            { this.state.type }
          </span>
        </div>
      </div>
    );
  }
}

export default Node;