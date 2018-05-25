import React, { Component } from 'react';
import { emojiUrl } from '../utils';
import config from '../config';
const { alphabet } = config;


class LoginChar extends Component {
  selectItem = (code, val) => {
    this.props.selectItem(code, val, this.props.index)
  }

  showAlphabet = () => {
    this.props.setActive(this.props.index);
  }

  render() {
    const { value, hover, valid } = this.props.code;
    const active = this.props.active === this.props.index;

    return (
      <div className={"login-char " + (!valid ? "invalid": '' ) }>
        <div className={"login-select " + (active ? "active": '' ) } onClick={ this.showAlphabet } style={{ backgroundImage: `url(${emojiUrl(value)}` }}></div>
        <div className={"login-alphabet " + (active ? "active": '' ) + ' hover-' + hover }>
          { alphabet.map((v,k) => 
            <div key={k} onClick={() => this.selectItem(this.props.code, v)} className={"login-options " + (hover === k ? "active": '') } style={{ backgroundImage: `url(${emojiUrl(v)}` }}></div>
          )}
        </div>
      </div>
    )
  }
};

export default LoginChar;
