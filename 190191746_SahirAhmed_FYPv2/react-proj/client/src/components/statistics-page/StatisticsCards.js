import React from 'react'
import './StatisticsCardsStyles.css'
import {Link} from 'react-router-dom'

const StatisticsCards = () => {
  return (
    <div className='statisticscards'>
        <div className='card-containerST'>
            <div className='cardST'>
                <h3>Individual Donator Leaderboard</h3>
                <span className='barST'></span>
                <br/>
                <Link to='./idlb' className='btn'>View</Link>
                <br/><br/>
            </div>
            <div className='cardST'>
                <h3>Charity Donations Leaderboard</h3>
                <span className='barST'></span>
                <br/>
                <Link to='./cdlb' className='btn'>View</Link>
                <br/><br/>
            </div>
            <div className='cardST'>
                <h3>Fundraiser Donations Leaderboard</h3>
                <span className='barST'></span>
                <br/>
                <Link to='./fdlb' className='btn'>View</Link>
                <br/><br/>
            </div>
        </div>
    </div>
  )
}

export default StatisticsCards