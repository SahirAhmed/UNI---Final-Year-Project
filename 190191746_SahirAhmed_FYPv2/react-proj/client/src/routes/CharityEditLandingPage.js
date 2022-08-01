import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CharityEditLandingPageCard from '../components/charities-page/CharityEditLandingPageCard'
import { ApiCallGet } from '../APICall/ApiCall'

const CharityEditLandingPage = () => {

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
        {(userid != null) && (individualacc === false) ? <CharityEditLandingPageCard userid = {userid} /> : <h1>charity user not logged in</h1>}

        <Footer />
    </div>
  )
}

export default CharityEditLandingPage