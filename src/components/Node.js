import React, { Component } from 'react';
const round = <svg width='150' height='150' viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'>
  <g id='round' fill='none' fillRule='evenodd' strokeLinecap='square'>
      <path d='M74,79.8359214 L74,150' id='Line' stroke='#000' strokeWidth='20'
      transform='matrix(1 0 0 -1 0 229)' />
  </g>
</svg>


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
        <button alt={this.state.name} className='emoji-background'>
          <span role="img" row={this.state.name} aria-label={this.state.position}>
            { this.state.type }
          </span>
        </button>
        { round }
      </div>
    );
  }
}

export default Node;