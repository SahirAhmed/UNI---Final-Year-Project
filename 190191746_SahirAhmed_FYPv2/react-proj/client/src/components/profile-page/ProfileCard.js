import React, {useState, useEffect} from 'react'
import './ProfileCardStyles.css'
import {Link, useNavigate} from 'react-router-dom'

import  {ApiCallGet, ApiCallDelete, ApiCallPost} from '../../APICall/ApiCall'
import Toast  from '../../Toast/Toast';

const ProfileCard = ({userid}) => {

  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");  
  const [totaldonated, setTotaldonated] = useState(0);
  const [fundraiserId, setFundraiserId] = useState(0);

  const handleIprofileDashGet=async()=>{

    try{
        let response =  await ApiCallGet('/profile/' + userid)
        console.log(response.data[0]);
        
        setFname(response.data[0].first_name);
        setLname(response.data[0].last_name);
        setEmail(response.data[0].email);
        setTotaldonated(response.data[0].total_donated);
        setFundraiserId(response.data[0].fundraiser_id);
        
            
    } catch (error) {

        if (error.response) {
            if (error.response.status === 500) {
                Toast("Internal server Error","error")
            } else if (error.response.status === 422) {
                Toast("Cannot Process Please Try Again");
            } else {
                Toast("Unknown Error", 'error');
            }
        } else {
            Toast("No Internet Connection");
        }

    }

  }

  useEffect(() => {
      handleIprofileDashGet();
    }, []); 
    
  const handleIprofileDelete=async()=>{

    try{
        let response =  await ApiCallDelete('/profile/' + userid)
        Toast("Account Deleted!", "success");
        navigate("../register");
            
    } catch (error) {

        if (error.response) {
            if (error.response.status === 500) {
                Toast("Internal server Error","error")
            } else if (error.response.status === 422) {
                Toast("Cannot Process Please Try Again");
            } else {
                Toast("Unknown Error", 'error');
            }
        } else {
            Toast("No Internet Connection");
        }

    }

  }

  const handleIprofileLogout=async()=>{
    let response = await ApiCallPost('/logout')
    console.log(response);
    Toast("Successfully Logged Out", "success")
  }

  function checkCategory(){
    if(totaldonated >= 10000){
      return(`HEART OF GOLD`);
    } else if ((totaldonated >= 7500) && (totaldonated < 10000)){
      return(`BENEVOLENT (£${totaldonated} (Max Level)`);
    } else if ((totaldonated >= 5000) && (totaldonated < 7500)){
      return(`HERO (£${totaldonated} / £7500)`);
    } else if ((totaldonated >= 2500) && (totaldonated < 5000)){
      return(`GENEROUS (£${totaldonated} / £5000)`);
    } else if ((totaldonated >= 1000) && (totaldonated < 2500)){
      return(`CHARITABLE (£${totaldonated} / £2500)`);
    } else if ((totaldonated >= 0) && (totaldonated < 1000)){
      return(`NOVICE (£${totaldonated} / £1000)`);
    }
  }

  return (
    <div className='profilecard'>
        <div className='card-containerPC'>
            <div className='cardPC'>
                <h3>{fname} {lname} | {email}</h3>
                <span className='barPC'></span>
                <br/>
                <Link className='btn' to='../fundraisereditlandingpage' >Edit Fundraiser Page</Link>
                <br/><br/><br/>
                <p>You are Ranked: <span style={{color:"gold"}}>{checkCategory()}</span> </p>
                <br/><br/>
                <Link to='../register' className='btn'  onClick={handleIprofileLogout}>Logout</Link>
                <br/><br/>
                <button className='btn' onClick={handleIprofileDelete} style={{color:"black", background:"red", border:"solid black"}}>Delete Account</button>
                <br className='brPC'/>
            </div>

        </div>
    </div>
  )
}

export default ProfileCard