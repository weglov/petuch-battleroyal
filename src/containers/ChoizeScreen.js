import React, { Component } from 'react';
import { emojiUrl } from '../utils';


class ChoizeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
    }
  }

  startGame = () => {
    this.setState({ active: true });
    this.props.start();
  }
  
  get code() {
    return this.props.code.split('U+')
      .filter(c => c.length)
      .map((c, k) => {
        const code = emojiUrl(c);

        return <span key={k} style={{backgroundImage: `url(${code})`}}></span>
      });
  }

  render() {
    return (
      <div>
        <div className="game-type">
          <div className="game-type-name">Ваш код для игры на стенде:</div>
          <div className="game-type-code">{ this.code }</div>
        </div>

        <div onClick={this.startGame} className={ "game-type-start " + (this.state.active ? "active" : "" ) }>
          <div className="game-type-content">
            Играть прямо сейчас!
          </div>
        </div>
      </div>
    )
  }
};

export default ChoizeScreen;
