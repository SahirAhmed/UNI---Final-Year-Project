import React, { Component } from 'react'

import './CharitiesImageStyles.css'

class CharitiesImage extends Component {
  render() {
    return (
      <div className='charities-img'>
        <div className='heading'>
            <h1>{this.props.heading}</h1>
            <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default CharitiesImage