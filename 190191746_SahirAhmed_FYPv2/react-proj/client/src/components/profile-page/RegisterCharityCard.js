import React from 'react'
import {FaTimes} from 'react-icons/fa'

import './RegisterCharityCardStyles.css'

function RegisterCharityCard(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='popup-inner'>
            <FaTimes id='close' size={20} style={{color: '#000'}} onClick={() => props.setTrigger(false)} />
            { props.children }
        </div>
    </div>
  ) : "";
}

export default RegisterCharityCard