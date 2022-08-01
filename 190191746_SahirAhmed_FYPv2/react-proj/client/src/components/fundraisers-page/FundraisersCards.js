import React from 'react'
import './FundraisersCardsStyles.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'

import  {ApiCallGet} from '../../APICall/ApiCall'
import Toast  from '../../Toast/Toast';

const FundraisersCards = () => {

  const[dataF, setDataF] = useState([{}]);

  const handleFundraiserListGet=async()=>{
      try{
              let response =  await ApiCallGet('/fundraisercards')
              console.log(response.data[1]);
              
              setDataF(response.data);
              
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
        handleFundraiserListGet();
    }, []);          

  return (
    <div className='fundraiserscards'>
        <div className='card-containerFU'>
          {dataF.map((values, index) => {
                  return (
                    <div className='cardFU'>
                      <h3>{values.name}</h3>
                      <span className='barFU'></span>
                      <p>Started by {values.first_name} {values.last_name}</p>
                      <br/><br/>
                      <Link to={"../fundraiserlandingpage/"+ values.fundraiser_id} className='btn'>View</Link>
                      <br/><br/>
                    </div>
                  );
              })}
        </div>
    </div>
  )
}

export default FundraisersCards