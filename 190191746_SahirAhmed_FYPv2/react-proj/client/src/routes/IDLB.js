import React from 'react'

import IDLBC from '../components/statistics-page/IndividualLBCard'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'

const IDLB = () => {
  return (
    <div>
        <NavBar />
        <IDLBC />
        <Footer />
    </div>
  )
}

export default IDLB
