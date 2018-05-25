import React, { Component } from 'react';
import { delay } from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { rotateBlock, nextGame, endGame, newGame, hideScreen, initGame } from '../store/actions';

import Loader from './Loader';
import Counter from './Counter';
import Block from './Block';
import Node from './Node';
import Next from './Next';
import Row from './Row';
import TopList from './TopList';


class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      next: false,
      nextText: 'Next',
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.gameIndex === nextProps.maxGames) {
      this.setState({ nextText: 'End'});
    } else {
      this.setState({ nextText: 'Next'});
    }
  }

  nextGame = () => {
    const { gameIndex, maxGames, paths } = this.props;

    if (this.state.next) return true;

    if (gameIndex < maxGames) {
      this.props.nextGame(paths.length);

      delay(() => this.props.initGame(), 1500);
      delay(() => this.props.hideScreen(), 3000);
    } else {
      this.props.endGame(paths.length);
    }
  };


  render() {
    const { counter, gameIndex, maxGames, paths, token } = this.props;

    return (
      <div className="app">
        <Counter counter={counter} score={paths.length}/>
        <div className="app-game">
          <div className="game-table" >{ this.matrix }</div>
        </div>
        <Next onClick={this.nextGame} text={this.state.nextText}/>
        <Loader active={this.props.nextScreen} text={`${gameIndex} / ${maxGames}`} position='right'/>
        <Loader active={this.props.endScreen} description={ 'Your score: ' + this.props.counter } onClick={this.props.newGame} text='GAME OVER' position='top'/>
        <TopList token={token} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { sets, matrix, paths, nextScreen, endScreen } = state.game;
  const { score, gameIndex, maxGames, endGameStatus, token } = state.user;

  return {
    sets,
    token,
    matrix,
    paths,
    counter: score,
    score,
    maxGames,
    gameIndex,
    endGameStatus,
    nextScreen,
    endScreen,
  }
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    rotateBlock,
    nextGame,
    endGame,
    newGame,
    hideScreen,
    initGame,
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Main);
