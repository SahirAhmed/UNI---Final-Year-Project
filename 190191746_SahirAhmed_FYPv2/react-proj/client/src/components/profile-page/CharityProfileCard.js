import React, {useState, useEffect} from 'react'
import './CharityProfileCardStyles.css'
import {Link, Navigate} from 'react-router-dom'

import  {ApiCallGet, ApiCallPost} from '../../APICall/ApiCall'
import Toast  from '../../Toast/Toast';

const CharityProfileCard = ({userid}) => {

  const [cid, setCid] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");  
  const [totalraised, setTotalraised] = useState(0);

  const handleCprofileDashGet=async()=>{

      try{
          let response =  await ApiCallGet('/profilecharity/' + userid)
          console.log(response.data[0]);
          setCid(response.data[0].charity_id);
          setName(response.data[0].name);
          setEmail(response.data[0].email);
          setTotalraised(response.data[0].total_raised);
              
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
      handleCprofileDashGet();
    }, []);  

    const handleCprofileLogout=async()=>{
      let response = await ApiCallPost('/logout')
      console.log(response);
      Toast("Successfully Logged Out", "success")
    }

    function checkCategory(){
      if(totalraised >= 10000){
        return(`G.O.A.T`);
      } else if ((totalraised >= 7500) && (totalraised < 10000)){
        return(`LEGENDARY (£${totalraised} (Max Level)`);
      } else if ((totalraised >= 5000) && (totalraised < 7500)){
        return(`MYTHIC (£${totalraised} / £7500)`);
      } else if ((totalraised >= 2500) && (totalraised < 5000)){
        return(`MASTER (£${totalraised} / £5000)`);
      } else if ((totalraised >= 1000) && (totalraised < 2500)){
        return(`CHAMPION (£${totalraised} / £2500)`);
      } else if ((totalraised >= 0) && (totalraised < 1000)){
        return(`NEWBIE (£${totalraised} / £1000)`);
      }
    }

  return (
    <div className='cprofilecard'>
        <div className='card-containerCPC'>
            <div className='cardCPC'>
                <h3>{name} | {email}</h3>
                <span className='barCPC'></span>
                <br/>
                <Link className='btn' to={'../charityeditlandingpage'}>Edit Charity Page</Link>
                <br/><br/><br/>
                <p>You are Ranked: <span style={{color:"gold"}}>{checkCategory()}</span> </p>
                <br/><br/>
                <Link className='btn' to={'../register'} onClick={handleCprofileLogout}>Logout</Link>
                <br className='brCPC'/>
            </div>

        </div>


    </div>
  )
}

export default CharityProfileCard