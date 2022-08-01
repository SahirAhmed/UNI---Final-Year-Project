import React from 'react'

import FDLBC from '../components/statistics-page/FundraiserLBCard'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'

const FDLB = () => {
  return (
    <div>
        <NavBar />
        <FDLBC />
        <Footer />
    </div>
  )
}

export default FDLB
