import React from 'react'
import FundraisersImage from '../components/fundraisers-page/FundraisersImage'
import FundraisersCards from '../components/fundraisers-page/FundraisersCards'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'

const Fundraisers = () => {
  return (
    <div>
        <NavBar />
        <FundraisersImage heading='Fundraisers' text='Support Local Communities' />
        <FundraisersCards />
        <Footer />
    </div>
  )
}

export default Fundraisers
