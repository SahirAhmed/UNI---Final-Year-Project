import React from 'react'
import AboutCards from '../components/about-us-page/AboutCards'
import AboutImage from '../components/about-us-page/AboutImage'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'

const About = () => {
  return (
    <div>
        <NavBar />
        <AboutImage heading='About Us' text='Goals and Motivations' />
        <AboutCards />
        <Footer />
    </div>
  )
}

export default About