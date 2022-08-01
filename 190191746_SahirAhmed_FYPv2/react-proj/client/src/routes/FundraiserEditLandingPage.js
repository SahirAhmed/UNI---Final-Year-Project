import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FundraiserEditLandingPageCard from '../components/fundraisers-page/FundraiserEditLandingPageCard'
import { ApiCallGet } from '../APICall/ApiCall'

const FundraiserEditLandingPage = () => {

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
    <div>
        <Navbar />
        {(userid != null) && (individualacc === true) ? <FundraiserEditLandingPageCard userid = {userid} /> : <h1>individual user not logged in</h1>}
  
        <Footer />
    </div>
  )
}

export default FundraiserEditLandingPage