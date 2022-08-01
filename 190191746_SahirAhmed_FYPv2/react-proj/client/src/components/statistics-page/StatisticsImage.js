import React, { Component } from 'react'

import './StatisticsImageStyles.css'

class StatisticsImage extends Component {
  render() {
    return (
      <div className='statistics-img'>
        <div className='heading'>
            <h1>{this.props.heading}</h1>
            <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default StatisticsImage