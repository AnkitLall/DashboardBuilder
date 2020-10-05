import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import className from 'classnames';

import './../css/PopUpBody.scss';

const getPlaceHolderText = (type) => {
    if(type === 'projects') {
        return 'Enter Project Name';
    }else if(type === 'files') {
        return 'Enter File Name';
    }
}

export function CreateNew(props) {

    let [name,setName] = useState('');
    let [placeHolder, setPlaceHolder] = useState('');
    let [saveClassName,setSaveClassName] = useState({'save-button-disabled': true});

    let saveButton = useRef(null);

    useEffect(() => {
        setPlaceHolder(getPlaceHolderText(props.type));
    });

    const close = () => {
        props.closeModal()
    }

    useLayoutEffect(() => {
        if(!name) {
            saveButton.current.disabled = true;
            setSaveClassName({'save-button-disabled': true});
        }else {
            saveButton.current.disabled = false;
            setSaveClassName({'save-button': true});
        }
    },[name])

    return(
        <div className={'create-container'}>
            <div className={'text-box-container'}>
                <input 
                    className={'text-box'} 
                    type={'text'} 
                    placeholder={placeHolder}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>            
            <div className={'button-container'}>
                <button className={'cancel-button'} onClick={() => close()}>Cancel</button>
                <button ref={saveButton} className={className(saveClassName)} onClick={() => props.saveNew(name)}>Save</button>
            </div>
        </div>
    )
}

export function ConfirmPopup(props) {

    return(
        <div className={'create-container'}>
            <div className={'text-box-container'}>
                <div className={'text-box'}>
                    <span>{props.text}</span>
                </div>
            </div>
            <div className={'button-container'}>
                <button className={'cancel-button'} onClick={() => props.closeModal()}>No</button>
                <button className={'save-button'} onClick={() => props.approveAction(name)}>Yes</button>
            </div>
        </div>
    )
}