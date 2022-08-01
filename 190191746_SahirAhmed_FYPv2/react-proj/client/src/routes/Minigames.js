import React,{useState, useEffect} from 'react'
import MinigamesImage from '../components/minigames-page/MinigamesImage'
import QuizCard from '../components/minigames-page/QuizCard'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'
import { ApiCallGet } from '../APICall/ApiCall'


const Minigames = () => {

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
        <NavBar />
        <MinigamesImage heading='Trivia' text='Boost Charity Rankings' />
        {(userid != null) && (individualacc === true) ? <QuizCard userid = {userid} /> : <h1>This section is only available for Individual Accounts!</h1>}
        <Footer />
    </div>
  )
}

export default Minigames