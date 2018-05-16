import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { rotateBlock, nextGame, endGame } from '../store/actions';
import Gamepad from 'react-gamepad';

import NextGame from './NextGame';
import Counter from './Counter';
import Block from './Block';
import Node from './Node';
import Next from './Next';
import Row from './Row';

Gamepad.layouts.XBOX.buttons.push('RS')

class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      next: false,
    }
  }
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
    const { gameIndex, maxGames } = this.props;
    if (gameIndex < maxGames) {
      this.props.nextGame(this.props.counter);
      this.props.next();
      this.setState({ next: true });
      setTimeout(() => this.setState({ next: false }), 1500);
    } else {
      this.props.endGame(this.props.counter);
    }
  };


  render() {
    const { counter, gameIndex, maxGames } = this.props;

    return (
      <Gamepad>
        <div className="app">
          <Counter counter={counter}/>
          <div className="app-game">
            <div className="game-table" >{ this.matrix }</div>
          </div>
          <Next onClick={this.nextGame} text='Next'/>
          <NextGame active={this.state.next} text={`${gameIndex} / ${maxGames}`} position='right'/>
        </div>
      </Gamepad>
    );
  }
}

const mapStateToProps = state => {
  const { sets, matrix, paths } = state.game;
  const { score, gameIndex, maxGames } = state.user;

  return {
    sets,
    matrix,
    paths,
    counter: paths.length + score,
    score,
    maxGames,
    gameIndex,
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    rotateBlock,
    nextGame,
    endGame,
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Main);
