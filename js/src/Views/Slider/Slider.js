import React,{ useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import QuestionBlock from './QuestionBlock';
import { setAllAnswers } from './SliderConfig';
import '../../css/Home.scss';
import { set } from 'd3';

let data = [
    // {
    //     q: 'Have you had a cancelation non pay in the last 3 years',
    //     options:['Yes','No']
    // },
    // {
    //     q: 'Are you over 30?',
    //     options:['Yes','No']
    // },
    {
        q: 'How Many continuous years have you had a drivers license for',
        options:[{
            lower:0,
            upper:3
        },{
            lower:3,
            upper:6
        },{
            lower:6,
            upper:10
        }]
    },
    // {
    //     q: 'How Many years have you had a continuous insurance for',
    //     options:['0-3','3-6','6-10','10+']
    // },
    // {
    //     q: 'How Many tickets do you have in the last 3 years?',
    //     options:['0','1','2','3','4+']
    // },
    // {
    //     q: 'How Many Accidents have you had in the last 6 years',
    //     options:['0','1','2','3+']
    // },    
]


export default function Slider() {

    let [qNum,setQNum] = useState(data.length-1);
    let [answers,setAnswers] = useState([]);
    let [answerSelected,setAnswerSelected] = useState(false);

    const setAnswer = (name,idx,question) => {
        let answerList = [...answers];
        let answer = {        
            q: question,
            ans: name
        }
        answerList.push(answer);
        setAnswers(answerList)
        setAnswerSelected(true);
    }

    const handleNext = () => {
        if(answerSelected) {
            setQNum(qNum+1);
            setAnswerSelected(false);
        }
    }

    const handleSubmit = () => {
        setAllAnswers(answers)
    }

    return(
        <div className={'slider-block'}>
            {
                (qNum) < data.length && 
                <QuestionBlock
                    q={data[qNum].q}
                    opt={data[qNum].options}
                    setAnswer={setAnswer}
                    qIndex={qNum}
                />
            }
            {
                qNum === data.length-1?
                <div className={'action'}>
                    <Link to='/slider/redirect'>
                        <button className={'action-button'} onClick={handleSubmit}>Submit</button>
                    </Link>
                </div>
                :
                <div className={'action'}>                    
                    <button className={'action-button'} onClick={handleNext} disabled={!answerSelected}>Next</button>                    
                </div>
            }
        </div>
    )
}