import React, { Component } from 'react'

import './AboutImageStyles.css'

class AboutImage extends Component {
  render() {
    return (
      <div className='about-img'>
        <div className='heading'>
            <h1>{this.props.heading}</h1>
            <p>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default AboutImage