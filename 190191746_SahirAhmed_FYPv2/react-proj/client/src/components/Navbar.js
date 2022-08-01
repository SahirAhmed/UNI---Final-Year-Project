import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {FaBars, FaTimes} from 'react-icons/fa'
import {BsPerson} from 'react-icons/bs'
import { ApiCallGet } from '../APICall/ApiCall'

import './NavbarStyles.css' 

const NavBar = () => {

  const[click, setClick] = useState(false)
  const handleClick = () => setClick(!click)


    const[userid, setUserid] = useState(null);
    const[individualacc, setIndividualacc] = useState(null);

    
    const handleCheckLoggedInStatus=async ()=>{
        let response =  await ApiCallGet('/checkloggedin');
        console.log(response);

        if(response.data.logged_in){
        setUserid(response.data.user)
        setIndividualacc(response.data.individual)
        
        } else{
        console.log("NOT LOGGED IN")
       
        }
    }

    useEffect(() => {
        handleCheckLoggedInStatus();
      }, []);
    
  return (
    <div className='header'>
        <Link to='/'><h1>Give to Receive</h1></Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/about'>About Us</Link>
            </li>
            <li>
                <Link to='/charities'>Charities</Link>
            </li>
            <li>
                <Link to='/fundraisers'>Fundraisers</Link>
            </li>
            <li>
                <Link to='/statistics'>Statistics</Link>
            </li>
            <li>
                <Link to='/minigames'>Minigames</Link>
            </li>
            <li>
          
                {individualacc == null && (
                    <Link to='/register'><BsPerson /></Link>
                )} 

                {individualacc == true && (
                    <Link to='/profile'><BsPerson /></Link>
                )} 

                {individualacc == false && (
                    <Link to='/profilecharity'><BsPerson /></Link>
                )} 

            </li>
        </ul>
        <div className='hamburger' onClick = {handleClick}>
            {click ? (<FaTimes size={20} style={{color: '#fff'}} />) : (<FaBars size={20} style={{color: '#fff'}} />)}
        </div>
    </div>

  )
}

export default NavBar