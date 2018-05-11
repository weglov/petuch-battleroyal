import React, { Component } from 'react';
import { indexOf } from 'lodash';
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
  constructor(props) {
    super(props);
    const { type, name, position, xy } = this.props.block;
    const rotatePos = rotateType[type];
  
    this.state = {
      type,
      name,
      xy,
      rotate: indexOf(rotatePos, position) * 90,
      active: position,
      types: rotatePos,
    }
  }

  get active() {
    return this.props.block.branches ? 'table-block__active' : ''
  }

  rotateBlock = () => {
    const position = indexOf(this.state.types, this.state.active);
    const active = position === this.state.types.length - 1 ? this.state.types[0] : this.state.types[position + 1];

    this.setState({ active, rotate: this.state.rotate + 90 })
    this.props.rotate({ type: this.state.type, name: this.state.name, xy: this.state.xy }, active);
  }

  blockStyle(type) {
    const deg = this.state.rotate;

    return {
      transform: `rotate(${deg}deg)`,
    };
  }

  render() {
    return (
      <td key={this.state.name} className={ this.active + ' table-block' }>
        <div
          alt={this.state.name}
          onClick={this.rotateBlock}
          className={ 'active-' + this.state.active + ' block-type' }
          style={this.blockStyle(this.state.type)}
        >
          { svgBlock[`type${this.state.type}`] }
        </div>
      </td>
    );
  }
}

export default Block;