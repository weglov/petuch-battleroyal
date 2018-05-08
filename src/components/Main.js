import React, { Component } from 'react';
import { rotateBlock } from '../game/game';

import Block from './Block';
import Node from './Node';
import Row from './Row';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: this.props.game.matrix,
      sets: this.props.game.sets,
      paths: this.props.game.paths,
    }
  }
  
  rotate = (block, position) => {
    const update = rotateBlock(this.state, block, position);
    this.setState({ paths: update.paths });
  }

  matrix() {
    return this.state.sets.map((row, i) => {
      return <Row key={i} number={i}>{
        row.map((v, y) => {
          if (v.node) {
            return <Node
              key={v.name}
              name={v.name}
              type={v.type}
              position={v.position}
            />
          } else {
            return <Block 
              rotate={this.rotate}
              key={v.name}
              xy={v.xy}
              type={v.type}
              name={v.name}
              position={v.position}/>
          }
        })
      }</Row>
    });
  }

  render() {
    return (
      <div className="game">
        <h1> Найденно связей: {this.state.paths.length} </h1>
        <table className="game-intro">
          <tbody>
            { this.matrix() }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
