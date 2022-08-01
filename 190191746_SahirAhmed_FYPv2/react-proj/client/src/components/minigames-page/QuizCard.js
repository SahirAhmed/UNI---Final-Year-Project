import React from 'react'
import './QuizCardStyles.css'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import {useEffect} from 'react'

import  {ApiCallGet,ApiCallPatch} from '../../APICall/ApiCall'
import Toast  from '../../Toast/Toast';

function QuizCard({userid}) {

    const[question, setQuestion] = useState("")
    const[correctOption, setCorrectOption] = useState("")
    const[option1, setOption1] =useState("")
    const[option2, setOption2] =useState("")

    
    
    const handleQuizGet=async()=>{

            try{
                    let response =  await ApiCallGet('/quiz')
                    console.log(response);
                    setQuestion(response.data[0].question)
                    setCorrectOption(response.data[0].correct_option)
                    setOption1(response.data[0].option1)
                    setOption2(response.data[0].option2)
                    
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
        handleQuizGet();
   }, []);

     
   const handleCorrectAnswerPatch = async()=>{
    let newEdit ={
        userid: userid
      };
      console.log(newEdit);

      try {
        let response =  await ApiCallPatch(`/quizcorrect`, newEdit);
        console.log(response.data);    
        
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


    function verifyAnswerA(){
        if (option1 === correctOption){
            document.getElementById('summary').innerHTML = "Correct! Your charity was awarded a point! - (+1)";
            
            handleCorrectAnswerPatch();
            
            handleQuizGet();
        } else {
            document.getElementById('summary').innerHTML = "Incorrect! Better luck next time!";
            handleQuizGet();
        }
    } 

    function verifyAnswerB(){
        if (option2 === correctOption){
            document.getElementById('summary').innerHTML = "Correct! Your charity was awarded a point! - (+1)";

            handleCorrectAnswerPatch();
            
            handleQuizGet();
        } else {
            document.getElementById('summary').innerHTML = "Incorrect! Better luck next time!";
            handleQuizGet();
        }
    } 


  return (
    <div className='quizcards'>
        <div className='card-containerQZ'>
            <div className='cardQZ'>
                <h3>{question}</h3>
                <br/>
                <button className='btn' onClick={verifyAnswerA} >A | {option1}</button>
                <button className='btn' onClick={verifyAnswerB} >B | {option2}</button>
                <br/><br/>
                <p id='summary'></p>
            </div>
        </div>
    </div>
  );

}

export default QuizCard;