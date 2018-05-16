import React, { Component } from 'react';


class NextGame extends Component {
  render() {
    return (
      <div className={"loader loader-position--" + this.props.position  + (this.props.active ? ' loader-active' : '') }>{ this.props.text }</div>
    );
  }
}

export default NextGame;