import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProfileCard from '../components/profile-page/ProfileCard'
import { ApiCallGet } from '../APICall/ApiCall'


const Profile = () => {

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
        {(userid != null) && (individualacc === true) ? <ProfileCard userid = {userid} /> : <h1>individual user not logged in</h1>}
        
        <Footer />
    </div>
  )
}

export default Profile