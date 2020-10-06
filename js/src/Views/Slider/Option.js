import React, { useState } from 'react';

export default function Option(props) {

    let [rangeValue,setRangeValue] = useState(props.opt.lower);

    const range = (params) => {
        let num = parseInt(params.target.value);
        setRangeValue(params.target.value);
    }

    return(
        <div style={{display:"flex",marginLeft: '10px',marginBottom: '10px',marginRight: '10px',marginTop: '0px'}}>
            <input onInput={(e) => range(e)} type={'range'} min={props.opt.lower} max={props.opt.upper-1} value={rangeValue} style={{marginRight:'50px',outline:'none'}}/>
            <input type={'text'} value={rangeValue} style={{width:'50px'}} />
        </div>
    )
}