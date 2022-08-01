import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CharityLandingPageCard from '../components/charities-page/CharityLandingPageCard'
import { ApiCallGet } from '../APICall/ApiCall'


const CharityLandingPage = () => {

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
        <CharityLandingPageCard userid = {userid} individualacc = {individualacc} />
        <Footer />
    </div>
  )
}

export default CharityLandingPage