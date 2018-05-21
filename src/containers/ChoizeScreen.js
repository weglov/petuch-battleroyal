import { delay } from 'lodash';
import React, { Component } from 'react';
import config from '../config';


const { emojiCdn } = config;

class ChoizeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      initGame: false,
    }
  }

  startGame = () => {
    this.setState({ active: true });
    this.props.start();

    delay(() => this.setState({ initGame: true }), 2000);
  }
  
  get code() {
    return this.props.code.split('U+')
      .filter(c => c.length)
      .map((c, k) => {
        const code = `${emojiCdn}${c.toLowerCase()}.png`;

        return <span key={k} style={{backgroundImage: `url(${code})`}}></span>
      });
  }

  render() {
    return (
      <div>
        <div className={"game-type " + (this.state.initGame ? "hide" : "" )}>
          <div className="game-type-name">Ваш код для игры на стенде:</div>
          <div className="game-type-code">{ this.code }</div>
        </div>

        <div onClick={this.startGame} className={ "game-type-start " + (this.state.active ? "active" : "" ) }>
          <div className="game-type-content">
            Играть прямо сейчас!
          </div>
        </div>

        { this.state.initGame ? this.props.children : null }
      </div>
    )
  }
};

export default ChoizeScreen;
