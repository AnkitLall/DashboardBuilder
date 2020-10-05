import React, { useState,useEffect } from 'react';

import '../../css/Home.scss';
import Option from './Option';

export default function QuestionBlock(props) {

    let [selected, isSelected] = useState();



    useEffect(() => {
        isSelected(false);
    },[props.opt])

    return(
        <div className='q-block'>
            <div className={'q-text'}>
                {props.q}
            </div>
            <div className={'opt-block'} style={{marginLeft:'75px',marginRight:'75px'}}>
                {
                    props.opt.map((opt,idx) => {
                        // return <div className={selected === idx?'opt-selected':'opt'} onClick={() => selectOpt(opt,idx)}>
                        //     {opt}
                        // </div>
                        return <Option
                            opt={opt}
                        />
                    })
                }
            </div>
        </div>
    )
}