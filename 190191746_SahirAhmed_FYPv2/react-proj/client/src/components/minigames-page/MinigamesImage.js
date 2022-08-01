import React, { Component } from 'react'

import './MinigamesImageStyles.css'

class MinigamesImage extends Component {
  render() {
    return (
      <div className='minigames-img'>
        <div className='heading'>
            <h1>{this.props.heading}</h1>
            <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default MinigamesImage

