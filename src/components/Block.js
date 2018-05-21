import React, { Component } from 'react';
import config from '../config';

const svgBlock = {
  type1: <svg width="150" height="150" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
    <g id="type-1" fill="none" fillRule="evenodd" strokeLinecap="square">
        <path d="M144.032605,76 L6,76" id="Line" stroke="#000" strokeWidth="20"
        transform="matrix(1 0 0 -1 0 151)" />
    </g>
  </svg>,
  type2: <svg width='150' height='150' viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'>
    <g id='type-2' fill='none' fillRule='evenodd' strokeLinecap='square' stroke='#000'
    strokeWidth='20'>
        <path d='M75,75 L75,5' id='Line' />
        <path d='M0,75 L66,75' id='Line' />
    </g>
  </svg>,
  type3: <svg width='150' height='150' viewBox='0 0 150 150' xmlns='http://www.w3.org/2000/svg'>
    <g id='type-3' fill='none' fillRule='evenodd' strokeLinecap='square' stroke='#000'
    strokeWidth='20'>
        <path d='M75,145 L75,5' id='Line' />
        <path d='M5,75 L145,75' id='Line' />
    </g>
  </svg>,
}

const { rotateType } = config;


class Block extends Component {
  get active() {
    return this.props.block.branches ? 'table-block__active' : ''
  }

  rotateBlock = () => {
    const { type, name, xy, position } = this.props.block;
    this.props.rotate({ type, name, xy }, position);
  }

  blockStyle = () => {
    return {
      transform: `rotate(${this.props.block.rotate}deg)`,
    };
  }

  render() {
    const { type, name, position, gamepadActive } = this.props.block;

    return (
      <div key={name} className={ this.active + ' table-block' + (gamepadActive ? ' pad-active' : '') }>
        <div
          alt={name}
          onClick={this.rotateBlock}
          className={ 'active-' + position + ' block-type' }
          style={this.blockStyle()}
        >
          { svgBlock[`type${type}`] }
        </div>
      </div>
    );
  }
}

export default Block;