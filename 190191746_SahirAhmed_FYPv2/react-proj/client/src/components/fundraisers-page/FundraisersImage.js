import React, { Component } from 'react'

import './FundraisersImageStyles.css'

class FundraisersImage extends Component {
  render() {
    return (
      <div className='fundraisers-img'>
        <div className='heading'>
            <h1>{this.props.heading}</h1>
            <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default FundraisersImage