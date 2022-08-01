import React, {useEffect} from 'react'
import './CharityLBCardStyles.css'

import  {ApiCallGet} from '../../APICall/ApiCall'
import Toast  from '../../Toast/Toast';

function CharityLBCard () {


    const handleCleaderboardGet=async()=>{

            try{
                    let response =  await ApiCallGet('/charityleaderboard')
                    console.log(response.data[0]);
                    let tableData="";
                    response.data.map((values)=>{
                        tableData+=`<tr>
                        <td>${values.cRank}</td>
                        <td>${values.name}</td>
                        <td>£${values.total_raised}</td>
                        </tr>`
                    });
                    document.getElementById("table_body").innerHTML=tableData;
                    
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
        handleCleaderboardGet();
      }, []); 

  return (
    <div className='CLBcard'>
        <div className='card-containerCLB'>
            <div className='cardCLB'>
            <h3>Charity Donations Leaderboard</h3>
             <table>
                    <tr>
                        <th>Rank</th>
                        <th>Charity Name</th>
                        <th>Total Recieved (£)</th>
                    </tr>
                    <tbody id="table_body"></tbody>                    
                </table>

            </div>

        </div>


    </div>
  )
}

export default CharityLBCard