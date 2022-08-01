import React from 'react'
import {FaTimes} from 'react-icons/fa'

import './DonateCardStyles.css'

function DonateCard(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <FaTimes id='close' size={20} style={{color: '#000'}} onClick={() => props.setTrigger(false)} />
            <div className='popup-really-inner'>
              { props.children }
            </div>
        </div>
    </div>
  ) : "";
}

export default DonateCard