import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { rotateBlock } from '../store/actions';
import Gamepad from 'react-gamepad';
import Block from './Block';
import Node from './Node';
import Row from './Row';

Gamepad.layouts.XBOX.buttons.push('RS')

class Main extends Component {  
  get matrix() {
    const { sets, rotateBlock } = this.props;

    return sets.map((row, i) => {
      return <Row key={i} number={i}>{
        row.map((v, y) => {
          if (v.node) {
            return <Node
              key={v.name}
              block={v}
            />
          } else {
            return <Block 
              rotate={rotateBlock}
              key={v.name}
              block={v}
            />
          }
        })
      }</Row>
    });
  }

  nextGame = () => {
    this.props.next();
    alert('coming soon');
  };


  render() {
    const { counter } = this.props;

    return (
      <Gamepad>
        <div className="app">
          <div className="app-header">
            <div className="app-header-round">{ counter }</div>
          </div>
          <div className="app-game">
            <div className="game-table">{ this.matrix }</div>
          </div>
          <div className="app-footer" onClick={ this.nextGame }>Next game</div>
        </div>
      </Gamepad>
    );
  }
}

const mapStateToProps = state => {
  const { sets, matrix, paths } = state;

  return {
    sets,
    matrix,
    paths,
    counter: paths.length,
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    rotateBlock,
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Main);
