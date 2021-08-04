import React, { Component } from 'react'

export default class AlphaButton extends Component {
  render() {
    const { key, value, handleClick, disabled } = this.props
    return (
      <button key={key} value={value} onClick={handleClick} disabled={disabled}>
        {value}
      </button>
    )
  }
}
