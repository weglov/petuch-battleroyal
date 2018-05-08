import React, { Component } from 'react';
import { indexOf } from 'lodash';
import config from '../config';
import type1 from '../assets/type1.svg';
import type2 from '../assets/type2.svg';
import type3 from '../assets/type3.svg';

const { rotateType } = config;


class Block extends Component {
  constructor(props) {
    super(props);
    const rotatePos = rotateType[props.type];
  
    this.state = {
      type: props.type,
      name: props.name,
      rotate: indexOf(rotatePos, props.position) * 90,
      active: props.position,
      types: rotatePos,
    }
  }

  rotateBlock = () => {
    const position = indexOf(this.state.types, this.state.active);
    const active = position === this.state.types.length - 1 ? this.state.types[0] : this.state.types[position + 1];

    this.setState({ active, rotate: this.state.rotate + 90 })
    this.props.rotate({ type: this.state.type, name: this.state.name, xy: this.props.xy }, active);
  }

  blockStyle(type) {
    const types = [type1, type2, type3];
    const deg = this.state.rotate;

    return {
      backgroundImage: `url(${types[type - 1]})`,
      transform: `rotate(${deg}deg)`,
    };
  }

  render() {
    return (
      <td key={this.state.name} className="table-block">
        <div
          alt={this.state.name}
          onClick={this.rotateBlock}
          className={ 'active-' + this.state.active + ' block-type' }
          style={this.blockStyle(this.state.type)}
        ></div>
      </td>
    );
  }
}

export default Block;