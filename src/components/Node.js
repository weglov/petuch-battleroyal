import React, { Component } from 'react';


class Node extends Component {
  render() {
    return (
      <td key={this.props.name} className="table-block table-block_parent">
        <div alt={this.props.name}>
          <span role="img" row={this.props.name} aria-label={this.props.position}>
            { this.props.type === 'chiken' ? '🐔' : '🐣' }
          </span>
        </div>
      </td>
    );
  }
}

export default Node;