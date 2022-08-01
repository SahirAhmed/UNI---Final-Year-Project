import React from 'react'
import './CharityEditLandingPageCardStyles.css'

import {useState, useEffect} from 'react';

import  {ApiCallGet, ApiCallPatch } from '../../APICall/ApiCall'
import Toast  from '../../Toast/Toast';

const CharityEditLandingPageCard = ({userid}) => {
 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [sociallink, setSociallink] = useState("");
  const [target, setTarget] = useState(0);
  const [merchantid, setMerchantid] = useState("");

  const handleCeditlandingpageGet=async()=>{
      try{
              let response =  await ApiCallGet('/charityeditlandingpage/' + userid)
              console.log(response.data[0]);

              setName(response.data[0].name);
              setEmail(response.data[0].email);
              setAbout(response.data[0].about);
              setSociallink(response.data[0].social_link);
              setTarget(response.data[0].target);
              setMerchantid(response.data[0].merchant_id);
              
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
      handleCeditlandingpageGet();
    }, []); 
    
  const handleEdit = async () => {
      let newEdit ={
        about: about,
        sociallink: sociallink,
        target: target,
        merchantid: merchantid
      };
      console.log(newEdit);

      try {
        let response =  await ApiCallPatch(`/charityeditlandingpage/`+ userid, newEdit);
        console.log(response.data);
        Toast("Update Successful","success")        
        
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

  return (
    <div className='clpcard'>
        <div className='card-containerCLP'>
            <div className='cardCLP'>
                <h3>{name} | {email}</h3>
                <span className='barCLP'></span>
                
                <div className='about'>
                  <p className='pCLP' ><b>About Us</b></p>
                  <textarea rows='5' value={about} onChange={(e)=>{setAbout(e.target.value)}}></textarea>
                </div>

                <div className='socials'>
                  <p className='pCLP'><b>Social Link (Website)</b></p>
                  <input type='text' value={sociallink} onChange={(e)=>{setSociallink(e.target.value)}}></input>
                </div>

                <div className='milestones'>
                  <p className='pCLP'><b>Set Target (£)</b></p>
                  <input type='number' value={target} onChange={(e)=>{setTarget(e.target.value)}}></input>
                </div>

                <div className='merchantid'>
                  <p className='pCLP' ><b>Paypal Merchant ID (case sensitive)</b></p>
                  <input type='text' value={merchantid} onChange={(e)=>{setMerchantid(e.target.value)}}></input>
                </div>

                <br/>

                <button  type='button' className='btn' onClick={handleEdit}>Apply Changes</button>
               
            </div>

        </div>


    </div>
  )
}

export default CharityEditLandingPageCard