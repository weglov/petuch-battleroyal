import React, { Component } from 'react';


class Loader extends Component {
  get description() {
    if (this.props.description) {
      return <div className="loader-description">{ this.props.description }</div>
    }

    return null;
  }
  render() {
    return (
      <div onClick={this.props.onClick} className={"loader loader-position--" + this.props.position  + (this.props.active ? ' loader-active' : '') }>
        <div className="loader-content">
          { this.props.text }
          { this.description }
          { this.props.children || null }
        </div>
      </div>
    );
  }
}

export default Loader;