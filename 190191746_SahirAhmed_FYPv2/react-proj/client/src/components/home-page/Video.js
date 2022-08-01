import React from 'react'
import {Link} from 'react-router-dom'

import './VideoStyles.css'
import povertyVideo from '../../assets/poverty.mp4'

const Video = () => {
  return (
    <div className='vid'>
        <video autoPlay loop muted id='video'>
            <source src={povertyVideo} type='video/mp4' />
        </video>

        <div className='content'>
            <h1>Give to Receive</h1>
            <p>The One Stop Charity Hub</p>
            <div>
                <Link to='/about' className='btn'>Find Out More</Link>
            </div>
        </div>

    </div>
  )
}

export default Video