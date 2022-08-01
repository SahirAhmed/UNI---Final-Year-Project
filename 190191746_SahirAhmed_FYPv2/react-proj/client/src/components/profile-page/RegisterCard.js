import React from 'react'
import  {ApiCallPost} from '../../APICall/ApiCall'
import  {ApiCallGet} from '../../APICall/ApiCall'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


import RegisterIndividualCard from './RegisterIndividualCard'
import RegisterCharityCard from './RegisterCharityCard'
import LoginCard from './LoginCard'
import Toast  from '../../Toast/Toast';
import './RegisterCardStyles.css'


function RegisterCard() {
    
    const [buttonPopupRI, setButtonPopupRI] = useState(false);
    const [buttonPopupRC, setButtonPopupRC] = useState(false);
    const [buttonPopupLI, setButtonPopupLI] = useState(false);
    const [buttonPopupLC, setButtonPopupLC] = useState(false);

    //allows to navigate to different web pages in case of events
    const navigate = useNavigate();
   
    // states for individual Registration
    const [i_fname,i_set_fname]=React.useState('');
    const [i_lname,i_set_lname]=React.useState('');
    const [i_email,i_set_email]=React.useState('');
    const [i_password,i_set_password]=React.useState('');
    const [i_cnfrmpassword,i_set_cnfpassword]=React.useState('');
    const [i_charityrepresentid,i_set_charityrepresentid]=React.useState(0);
    
    
     // States for charity Registration
     const [c_charityName,c_set_charity]=React.useState('');
     const [c_country,c_set_country]=React.useState('');
     const [c_reg_no,c_set_reg_no]=React.useState('');
     const [c_email,c_set_email]=React.useState('');
     const [c_password,c_set_password]=React.useState('');
     const [c_cnf_password,c_set_cnf_password]=React.useState('');
     const [c_merchant_id,c_set_merchant_id]=React.useState('');
    
        //Routes for Login as individual
          const[ li_email,set_liemail]=React.useState('');
          const [li_password,set_lipassword]=React.useState('');
  
        //Routes for Login as charity
            const[ lc_email,set_lcemail]=React.useState('');
            const [lc_password,set_lcpassword]=React.useState('');


    const handleCharityGet = async() => {
        try{
                let response =  await ApiCallGet('/charityrepresentid')
                

                let optionData="";
                response.data.map((values)=>{
                    optionData+=`<option value="${values.charity_id}">${values.name}</option>`
                });
                document.getElementById("select_body").innerHTML+=optionData;
        } catch (error) {

            if (error.response) {
                if (error.response.status === 500) {
                    Toast("Internal server Error","error")
                } else if (error.response.status === 422) {
                    Toast("Cannot Process Please Try Again");
                } else {
                    Toast("Unknown Error", 'error');
                }
            } 

        }
    }
    
    useEffect(() => {
            handleCharityGet();
    }, [ buttonPopupRI===true]);
        
    const handleIndividualRegister=async()=>{

           if(i_password!==i_cnfrmpassword){   
             Toast("Password Not Match","error");        
            return 
           } else if(i_fname,i_lname,i_email === ""){   
                Toast("All fields are required to be filled","error");        
            return 
          }
            
           let ScreenData={
              i_fname:i_fname,
              i_lname:i_lname,
              i_email:i_email,
              i_password:i_password,
                i_charityrepresentid:i_charityrepresentid
           }
             try{
                   let response =  await ApiCallPost('/individualregister',ScreenData)
                   Toast("Registered Successfully","success")     

                    navigate("/");

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
     
    const handleCharityRegister=async ()=>{

              if(c_password!==c_cnf_password){
                   Toast("Password Did Not Match","error")
              } else if(c_charityName, c_country, c_reg_no, c_merchant_id, c_email === ""){   
                    Toast("All fields are required to be filled","error");        
                return 
            }

              else{

         let ScreenData={
            c_charityName:c_charityName,
            c_country:c_country,
            c_reg_no:c_reg_no,
            c_email:c_email,
            c_password,
            c_merchant_id: c_merchant_id

         }
            
         console.log(ScreenData);
           
           try{
                 let response =  await ApiCallPost('/charityregister',ScreenData)
                 Toast("Registered Successfully","success")

                 navigate("/");

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


    }

    const handleLoginIndividual=async()=>{
          
               let ScreenData={
                       li_email:li_email,
                       li_password:li_password,

               }

              console.log(ScreenData);

              try{
                let response =  await ApiCallPost('/loginIndividual',ScreenData)
                Toast("Login Successfully","success")

                
                console.log(response);

                if(response.data.error) {
                    alert(response.data.error); } else {
                sessionStorage.setItem("accessToken", "success"); }

                        

                navigate("../profile")

          } catch (error) {

             if (error.response) {
                 if (error.response.status === 500) {
                     Toast("Internal server Error","error")
                 } else if (error.response.status === 422) {
                     Toast("Cannot Process Please Try Again");
                 }
                 else if (error.response.status === 404) {
                    Toast(" Email or Password Is Incorrect","error");
                }
                 
                 else {
                     Toast("Unknown Error", 'error');
                 }
             } else {
                 Toast("No Internet Connection");
             }
 
         }

    }

    const handleLoginCharity=async()=>{
          
            let ScreenData={
                    lc_email:lc_email,
                    lc_password:lc_password,

            }

        console.log(ScreenData);

        try{
            let response =  await ApiCallPost('/loginCharity',ScreenData)
            Toast("Login Successfully","success")

            if(response.data.error) {
                alert(response.data.error); } else {
            sessionStorage.setItem("accessToken", "success"); }

            navigate("../profilecharity")

    } catch (error) {

        if (error.response) {
            if (error.response.status === 500) {
                Toast("Internal server Error","error")
            } else if (error.response.status === 422) {
                Toast("Cannot Process Please Try Again");
            }
            else if (error.response.status === 404) {
                Toast(" Email or Password Is Incorrect","error");
            }
            
            else {
                Toast("Unknown Error", 'error');
            }
        } else {
            Toast("No Internet Connection");
        }

    }

    }

    return (
        <div className='registercard'>
            
            <div className='card-containerRC'>
                <div className='cardRC'>
                    <h3>Register As Individual</h3>
                    <span className='barRC'></span>
                    <p>If you would like to register as an INDIVIDUAL user, then be sure to press the button below. As an individual user, you can make donations towards charities, save your information to make regular contributions much easier, and best of all, host personal fundraisers! </p>
                    <button className='btn' onClick={() => setButtonPopupRI(true)}>Here</button>
                    <RegisterIndividualCard trigger={buttonPopupRI} setTrigger={setButtonPopupRI}>
                        <h2 style={{color:'#000'}}>Register as an Individual</h2>
                        <form>
                            <label>First Name</label>
                            <input type='text' onChange={(e)=>{ i_set_fname(e.target.value)}}    required></input>
                            <label>Last Name</label>
                            <input type='text' onChange={(e)=>{ i_set_lname(e.target.value)}}   required></input>
                            <label>Email</label>
                            <input type='email' onChange={(e)=>{ i_set_email(e.target.value)}} required></input>
                            <label>Create Password</label>
                            <input type='password' onChange={(e)=>{ i_set_password(e.target.value)}}  required></input>
                            <label>Confirm Password</label>
                            <input type='password' onChange={(e)=>{ i_set_cnfpassword(e.target.value)}} required></input>
                            <label>Which Charity would you like to represent?</label>
                            <select id='select_body' onChange={(e)=>{ i_set_charityrepresentid(e.target.value)}}><option selected>-Please Select An Option-</option></select>
                            <button type="button" className='btn'  onClick={handleIndividualRegister}  >Create Account</button>
                        </form>
                    </RegisterIndividualCard>
                </div>
                <div className='cardRC'>
                    <h3>Register As Charity</h3>
                    <span className='barRC'></span>
                    <p>If you would like to register your CHARITY, then be sure to press the button below. As a charity account, you will be given a dedicated landing page in our charities section which you can edit and setup to allow incoming donations. You cannot make contributions however. </p>
                    <button className='btn' onClick={() => setButtonPopupRC(true)}>Here</button>
                    <RegisterCharityCard trigger={buttonPopupRC} setTrigger={setButtonPopupRC}>
                        <h2 style={{color:'#000'}}>Register as a Charity</h2>
                        <form>
                            <label>Charity Name</label>
                            <input type='text'  onChange={(e)=>{c_set_charity(e.target.value)}} required></input>
                            <label>Country</label>
                            <input type='text' onChange={(e)=>{c_set_country(e.target.value)}}  required></input>
                            <label>Registration Number</label>
                            <input type='number' onChange={(e)=>{c_set_reg_no(e.target.value)}}  required></input>
                            <label>Paypal Merchant ID</label>
                            <input type='text' onChange={(e)=>{c_set_merchant_id(e.target.value)}}  required></input>
                            <label>Email</label>
                            <input type='email' onChange={(e)=>{c_set_email(e.target.value)}}  required></input>
                            <label>Password</label>
                            <input type='password' onChange={(e)=>{c_set_password(e.target.value)}} required></input>
                            <label>Confirm Password</label>
                            <input type='password'  onChange={(e)=>{c_set_cnf_password(e.target.value)}} required></input>
                            <button type='button'  onClick={handleCharityRegister} className='btn'>Create Account</button>
                        </form>
                    </RegisterCharityCard>
                </div>
                
            </div>
            <div className='cardRC' id='second'>
                <h3>Already a member? Login...</h3>
                <span className='barRC'></span>
                <button className='btn' onClick={() => setButtonPopupLI(true)}>As Individual</button>
                    <LoginCard trigger={buttonPopupLI} setTrigger={setButtonPopupLI}>
                        <h2 style={{color:'#000'}}>Login</h2>
                        <form>
                            <label>Email</label>
                            <input type='email' onChange={(e)=>{set_liemail(e.target.value)}}  required />
                            <label>Password</label>
                            <input type='password' onChange={(e)=>{set_lipassword(e.target.value)}} required></input>
                            <button  type='button' onClick={ handleLoginIndividual} className='btn'>Sign In</button>
                        </form>
                    </LoginCard>
                <button className='btn' onClick={() => setButtonPopupLC(true)}>As Charity</button>
                    <LoginCard trigger={buttonPopupLC} setTrigger={setButtonPopupLC}>
                        <h2 style={{color:'#000'}}>Login</h2>
                        <form>
                            <label>Email</label>
                            <input type='email' onChange={(e)=>{set_lcemail(e.target.value)}}  required></input>
                            <label>Password</label>
                            <input type='password' onChange={(e)=>{set_lcpassword(e.target.value)}} required></input>
                            <button  type='button' onClick={ handleLoginCharity} className='btn'>Sign In</button>
                        </form>
                    </LoginCard>
            </div>

        </div>
    )
}

export default RegisterCard