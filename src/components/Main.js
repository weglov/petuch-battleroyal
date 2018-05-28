import React, { Component } from 'react';
import { delay } from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { rotateBlock, nextGame, endGame, newGame, hideScreen, initGame } from '../store/actions';

import Loader from './Loader';
import Counter from './Counter';
import Block from './Block';
import Node from './Node';
import Next from './Next';
import Row from './Row';


class Main extends Component {
  constructor(props){
    super(props);

    this.state = {
      next: false,
      nextText: 'Дальше',
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
      this.setState({ nextText: 'Конец'});
    } else {
      this.setState({ nextText: 'Дальше'});
    }
  }

  nextGame = () => {
    const { gameIndex, maxGames, paths } = this.props;

    if (this.state.next) return true;

    if (gameIndex < maxGames) {
      this.props.nextGame(paths.length);

      delay(() => this.props.initGame(), 1500);
      delay(() => this.props.hideScreen(), 2000);
    } else {
      this.props.endGame(paths.length);
    }
  };


  render() {
    const { counter, gameIndex, maxGames, paths, displayName } = this.props;

    return (
      <div className="app">
        <Counter counter={counter} score={paths.length} name={displayName} />
        <div className="app-game">
          <div className="game-table" >{ this.matrix }</div>
        </div>
        <Next onClick={this.nextGame} text={this.state.nextText}/>

        <div className="navigation">
          <div className="xbox-info">
            <div className="xbox-icon"><img alt="footer" src="https://png.icons8.com/color/64/000000/xbox-x.png"/></div>
            <div className="xbox-description">Повернуть блок</div>
          </div>
          <div className="xbox-info" onClick={this.nextGame}>
            <div className="xbox-icon"><img alt="footer" src="https://png.icons8.com/color/64/000000/xbox-a.png"/></div>
            <div className="xbox-description">{ `${this.state.nextText} ${gameIndex} / ${maxGames}` }</div>
          </div>
        </div>

        <Loader active={this.props.nextScreen} text={`${gameIndex} / ${maxGames}`} position='right'/>
        <Loader end="true" active={this.props.endScreen} text='GAME OVER' position='top'>
          <div className="loader-score" onClick={this.props.newGame}>{ 'Ваш счет: ' + this.props.counter }</div>
          <div className="loader-newGame" onClick={this.props.newGame}><div className="xbox-icon xbox-icon-back"></div>Попробовать еще раз</div>
          <div className="loader-newGameLogout"><div className="xbox-icon xbox-icon-start"></div>Начать игру под другим пользователем</div>
          <Link to='/top' className="loader-topScore">Посмотреть результаты</Link>
        </Loader>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { sets, matrix, paths, nextScreen, endScreen } = state.game;
  const { score, gameIndex, maxGames, endGameStatus, token } = state.user;
  const { displayName } = state.user.auth;

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
    displayName,
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
