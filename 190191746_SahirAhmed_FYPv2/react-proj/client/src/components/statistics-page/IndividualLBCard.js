import React, {useEffect} from 'react'
import './IndividualLBCardStyles.css'

import  {ApiCallGet} from '../../APICall/ApiCall'
import Toast  from '../../Toast/Toast';

const IndividualLBCard = () => {

    const handleIleaderboardGet=async()=>{

            try{
                    let response =  await ApiCallGet('/individualleaderboard')
                    console.log(response.data[0]);
                    let tableData="";
                    response.data.map((values)=>{
                        tableData+=`<tr>
                        <td>${values.cRank}</td>
                        <td>${values.first_name}</td>
                        <td>${values.last_name}</td>
                        <td>£${values.total_donated}</td>
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
        handleIleaderboardGet();
      }, []);      

  return (
    <div className='ILBcard'>
        <div className='card-containerILB'>
            <div className='cardILB'>
            <h3>Individual Donator Leaderboard</h3>
             <table>
                    <tr>
                        <th>Rank</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Total Donated (£)</th>
                    </tr>
                    <tbody id="table_body"></tbody>                                 
                </table>

            </div>

        </div>


    </div>
  )
}

export default IndividualLBCard