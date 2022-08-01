import React from 'react'
import CharitiesImage from '../components/charities-page/CharitiesImage'
import CharitiesCards from '../components/charities-page/CharitiesCards'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'

const Charities = () => {
  return (
    <div>
        <NavBar />
        <CharitiesImage heading='Charities' text='Browse Great Causes' />
        <CharitiesCards />
        <Footer />
    </div>
  )
}

export default Charities