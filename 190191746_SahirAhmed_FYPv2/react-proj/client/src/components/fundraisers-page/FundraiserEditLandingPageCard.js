import React from 'react'
import './FundraiserEditLandingPageCardStyles.css'

import {useState, useEffect} from 'react';

import  {ApiCallGet, ApiCallPatch } from '../../APICall/ApiCall'
import Toast  from '../../Toast/Toast';

const FundraiserEditLandingPageCard = ({userid}) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [sociallink, setSociallink] = useState("");
  const [target, setTarget] = useState(0);
  const [merchantid, setMerchantid] = useState("");
  const [enabled, setEnabled] = useState(0);

  const handleFeditlandingpageGet=async()=>{
    try{
              let response =  await ApiCallGet('/fundraisereditlandingpage/' + userid)
              console.log(response);

              setName(response.data[0].name);
              setEmail(response.data[0].email);
              setAbout(response.data[0].about);
              setSociallink(response.data[0].social_link);
              setTarget(response.data[0].target);
              setMerchantid(response.data[0].merchant_id);
              
              if (response.data[0].enabled === 1){
                setEnabled(1);
                document.getElementById("tickpublic").checked = true;
              }

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
      handleFeditlandingpageGet();
    }, []); 

  const handleEdit = async () => {
      let newEdit ={
        name: name,
        about: about,
        sociallink: sociallink,
        target: target,
        enabled: enabled,
        merchantid: merchantid
      };
      console.log(newEdit);

      try {       
        let response =  await ApiCallPatch('/fundraisereditlandingpage/'+ userid, newEdit);
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

  function functick(){
      if(document.getElementById("tickpublic").checked){
        setEnabled(1);
      } else {
        setEnabled(0);
      }
  }

  return (
    <div className='clpcard'>
        <div className='card-containerCLP'>
            <div className='cardCLP'>
                <h3>{name} | {email}</h3>
                <span className='barCLP'></span>
                
                <div className='name'>
                  <p className='pCLP' ><b>Name of Fundraiser</b></p>
                  <input type='text' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
                </div>
                
                <div className='about'>
                  <p className='pCLP' ><b>Information About the Cause</b></p>
                  <textarea rows='5' value={about} onChange={(e)=>{setAbout(e.target.value)}}></textarea>
                </div>

                <div className='socials'>
                  <p className='pCLP'><b>Relevant Website Link</b></p>
                  <input type='text' value={sociallink} onChange={(e)=>{setSociallink(e.target.value)}}></input>
                </div>

                <div className='milestones'>
                  <p className='pCLP'><b>Trying to Raise (£)</b></p>
                  <input type='number' value={target} onChange={(e)=>{setTarget(e.target.value)}}></input>
                </div>

                <div className='merchantid'>
                  <p className='pCLP' ><b>Paypal Merchant ID (case sensitive)</b></p>
                  <input type='text' value={merchantid} onChange={(e)=>{setMerchantid(e.target.value)}}></input>
                </div>

                <div className='publicenable'>
                  <p className='pCLP'><b>Make page publicly visible?</b></p>
                  <label className='switch'>
                    <input type='checkbox' id="tickpublic" onClick={functick}></input>
                    <span className='slider round'></span>
                  </label>
                </div>

                <br/>

                <button  type='button' className='btn' onClick={handleEdit}>Apply Changes</button>
               
            </div>

        </div>


    </div>
  )
}

export default FundraiserEditLandingPageCard