import React, { Component } from 'react';

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
    const update = this.props.game.rotate(block, position);
    this.setState({ paths: update.paths });
  }

  matrix() {
    return this.state.sets.map((row, i) => {
      return <Row key={i} number={i}>{
        row.map((v, y) => {
          if (v.node) {
            return <Node
              key={v.name}
              block={v}
            />
          } else {
            return <Block 
              rotate={this.rotate}
              key={v.name}
              block={v}
            />
          }
        })
      }</Row>
    });
  }

  nextGame = () => {
    alert('coming soon')
    // this.props.next();
  };

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <div className="app-header-round">{ this.state.paths.length }</div>
        </div>
        <div className="app-game">
          <div className="game-table">{ this.matrix() }</div>
        </div>
        <div className="app-footer" onClick={ this.nextGame }>Next game</div>
      </div>
    );
  }
}

export default Main;
