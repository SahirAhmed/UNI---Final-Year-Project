import React from 'react'
import './FundraiserLandingPageCardStyles.css'

import DonateCard from '../DonateCard'
import {useState, useEffect} from 'react'

import  {ApiCallGet, ApiCallPatch} from '../../APICall/ApiCall'
import Toast  from '../../Toast/Toast';

import { PayPalButton } from "react-paypal-button-v2";

const FundraiserLandingPageCard = ({userid, individualacc}) => {

  const [buttonPopupDonate, setButtonPopupDonate] = useState(false);

  const [state, setState] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [sociallink, setSociallink] = useState("");
  const [target, setTarget] = useState(0);
  const [merchantid, setMerchantid] = useState("");
  const [totalraised, setTotalraised] = useState(0);

  const handleFlandingpageGet=async()=>{

      try{
              let response =  await ApiCallGet('/fundraiserlandingpage/' + window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1))
              console.log(response.data[0]);
              setName(response.data[0].name);
              setEmail(response.data[0].email);
              setAbout(response.data[0].about);
              setSociallink(response.data[0].social_link);
              setTarget(response.data[0].target);
              setMerchantid(response.data[0].merchant_id);
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
        handleFlandingpageGet();
      }, []);  

  return (
    <div className='clpcard'>
        <div className='card-containerCLP'>
            <div className='cardCLP'>
                <h3>{name} | <a href={`mailto:` + email}>{email}</a></h3>
                <span className='barCLP'></span>
                
                <div className='about'>
                  <p className='pCLP' ><b>About Me</b></p>
                  <p className='pCLP'>{about}</p>
                </div>

                <div className='socials'>
                  <p className='pCLP'><b>Social Link</b></p>
                  <p className='pCLP'>
                      <ul>
                        <li><a href={sociallink}>{sociallink}</a></li>
                      </ul>
                  </p>
                </div>

                <div className='milestones'>
                  <p className='pCLP'><b>Trying to Raise</b></p>
                  <p className='pCLP'>£{totalraised} <progress value={totalraised} max={target}></progress> £{target}</p>
                </div>

                <button  type='button' className='btn' onClick={() => (individualacc === false) ? setButtonPopupDonate(false) & Toast("User not authorized to donate!", "error") : setButtonPopupDonate(true)}>Donate</button>
                <DonateCard trigger={buttonPopupDonate} setTrigger={setButtonPopupDonate}>
                      <h2 style={{color:'#000'}}>How much would you like to donate?</h2>
                        <form>
                            <label>Amount</label>
                            <input type='number' value={state} onChange={(e) => setState(e.target.value)} ></input>

                            <PayPalButton
                                options={{
                                  clientId: merchantid, 
                                  currency: "GBP"
                                }}
                                amount={state}
                                onSuccess={(details, data) => {
                                  
                                  //write put requests to update charity raised and individual donated
                                  const handleChangeFundraiser = async () => {
                                    let newEdit ={
                                      total_raised: state,
                                    };
                                    console.log(newEdit);
                              
                                    try {
                                      let response =  await ApiCallPatch(`/fundraiserlandingpage/`+ window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1), newEdit);
                                      console.log(response.data);
                                      Toast("Payment Successful, Refresh to see changes!","success")        
                                      
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

                                handleChangeFundraiser();

                                const handleChangeIndividual = async () => {
                                  let newEdit ={
                                    userid: userid,
                                    total_donated: state,
                                  };
                                  console.log(newEdit);
                            
                                  try {
                                    let response =  await ApiCallPatch(`/individualdonateeffectfund`, newEdit);
                                    console.log(response.data);
                                    Toast("Payment Successful, Refresh to see changes!","success")        
                                    
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

                              if(userid){
                                handleChangeIndividual();
                              }




                                  console.log({ details, data });
                                }}
                              />

                        </form>
                </DonateCard>
               
            </div>

        </div>


    </div>
  )
}

export default FundraiserLandingPageCard