import React from 'react'
import StatisticsImage from '../components/statistics-page/StatisticsImage'
import StatisticsCards from '../components/statistics-page/StatisticsCards'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'

const Statistics = () => {
  return (
    <div>
        <NavBar />
        <StatisticsImage heading='Statistics' text='Get on the Leaderboards' />
        <StatisticsCards />
        <Footer />
    </div>
  )
}

export default Statistics
