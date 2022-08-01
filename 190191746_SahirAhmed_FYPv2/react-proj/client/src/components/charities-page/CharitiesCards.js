import React, { useState, useEffect }  from 'react'
import './CharitiesCardsStyles.css'
import {Link} from 'react-router-dom'

import  {ApiCallGet} from '../../APICall/ApiCall'
import Toast  from '../../Toast/Toast';

function CharitiesCards() {
   
    const[dataC, setDataC] = useState([{}]);

    const handleCharityListGet=async()=>{
            try{
                    let response =  await ApiCallGet('/charitycards')
                    console.log(response.data[1]);
                    
                    setDataC(response.data);
                    
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
        handleCharityListGet();
   }, []);

  return (
    <div className='charitiescards'>
        <div className='card-containerCH' id='card_body'>
           {dataC.map((values, index) => {
                    return (
                        <div className='cardCH'>
                            <h3>{values.name}  ({values.points} pts)</h3>
                            <span className='barCH'></span>
                            <p>{values.about}</p>
                            <br/><br/>
                            <Link to={"../charitylandingpage/"+ values.charity_id} className='btn'>View</Link>
                            <br/><br/>
                        </div>
                    );
                })}
        </div>
    </div>
  )
}

export default CharitiesCards