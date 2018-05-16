import React, { Component } from 'react';
const round = <svg width='150' height='150' viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'>
  <g id='round' fill='none' fillRule='evenodd' strokeLinecap='square'>
      <path d='M74,79.8359214 L74,150' id='Line' stroke='#000' strokeWidth='20'
      transform='matrix(1 0 0 -1 0 229)' />
  </g>
</svg>


class Node extends Component {
  get active() {
    const { branches } = this.props.block;

    return branches ? 'table-block__active' : ''
  }

  render() {
    const { name, parent, emojiUrl } = this.props.block;

    return (
      <div key={name} className={
        "table-node--" + parent + " table-block table-block_parent " + this.active 
      }>
        <div alt={name} style={{ backgroundImage: `url(${emojiUrl}` }} className='emoji-background'></div>
        { round }
      </div>
    );
  }
}

export default Node;