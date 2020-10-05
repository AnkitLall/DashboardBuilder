import React, { useState } from 'react';

import { getAllAnswers } from './SliderConfig';

export default function SliderRedirect() {

    let [answers,setAnswers] = useState(getAllAnswers());

    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:'center',height:'100%', flexDirection:'column'}}>
            {
                answers.map((answer) => {
                    return <div className={'ans-block'} style={{flexDirection: 'column',
                        display: 'flex',
                        margin: '11px',
                        width: '500px'}}>
                        <span style={{textAlign:"left"}} className={'que'}>{`Q. ${answer.q}`}</span>
                        <span style={{textAlign:"left"}}>{`Ans. ${answer.ans}`}</span>
                    </div>
                })
            }
        </div>
    )
}