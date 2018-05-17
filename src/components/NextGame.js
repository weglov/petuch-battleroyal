import React, { Component } from 'react';


class NextGame extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className={"loader loader-position--" + this.props.position  + (this.props.active ? ' loader-active' : '') }>
        <div className="loader-content">
          { this.props.text }
          <div className="loader-description">
            { this.props.description}
          </div>
        </div>
      </div>
    );
  }
}

export default NextGame;