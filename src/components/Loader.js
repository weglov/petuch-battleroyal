import React, { Component } from 'react';


class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }

  startGame = () => {
    this.setState({ active: true })
  }

  render() {
    return (
      <div onClick={this.startGame} className={"loader " + (this.state.active ? 'loader-active' : '') }>START</div>
    );
  }
}

export default Loader;