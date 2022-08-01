import React from 'react'
import './AboutCardsStyles.css'

const AboutCards = () => {
  return (
    <div className='aboutcards'>
        <div className='card-containerAU'>
            <div className='cardAU'>
                <h3>What is Give to Receive?</h3>
                <span className='barAU'></span>
                <p>Give to Receive is an application developed by Sahir Ahmed as a final year project for Queen Mary University of London. It aims to amalgamate all charities/fundraisers under one website and give each cause an equal chance to raise funds.</p>
            </div>
            <div className='cardAU'>
                <h3>Our Vision</h3>
                <span className='barAU'></span>
                <p>Through the ease of use and design, our vision revolves around the idea of wanting to help boost donations on a global scale and make it easier for consumers to come to one website to make their charitable contributions.</p>
            </div>
            <div className='cardAU'>
                <h3>Who am I?</h3>
                <span className='barAU'></span>
                <p>My name is Sahir Ahmed. I am a final year undergraduate student studying Computer Science creating this application for my final year project. I aim to enhance this application for many years to come as I am a huge advocate for donating to good causes.</p>
            </div>

        </div>


    </div>
  )
}

export default AboutCards