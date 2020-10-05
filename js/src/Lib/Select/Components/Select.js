import React, { useState,useEffect } from 'react';

import '../css/Select.scss';
export default function Select(props) {

    let [options,setOptions] = useState(props.options);
    let [placeholderText,setPlaceholderText] = useState(props.placeholderText?props.placeholderText:'Select');

    const onSelect = (params) => {
        let selectedOptions = [];
        Object.keys(params.currentTarget.selectedOptions).forEach((option) => {
            let index = params.currentTarget.selectedOptions[option].index;
            if(index) {
                selectedOptions.push(options[index - 1]);
            }else {
                selectedOptions.push({value: 'selectDefault', label: placeholderText});
            }
        });
        props.onChange(selectedOptions);
    }

    useEffect(() => {
        setOptions(props.options);
    },[props.options])

    return(
        <div className={'select-lib-container'}>
            <select onChange={(e) => onSelect(e)} className={'dropdown-button'} multiple={props.multiple}>
                <option value={'selectDefault'} >{placeholderText}</option>
                {
                    options && options.map((option, idx) => {
                        if(option.label === props.selectedOptionValue || option.value === props.selectedOptionValue) {
                            return <option key={idx} value={option.value} selected>{option.label}</option>
                        }else {
                            return <option key={idx} value={option.value}>{option.label}</option>
                        }
                    })
                }
            </select>
        </div>
    )
}