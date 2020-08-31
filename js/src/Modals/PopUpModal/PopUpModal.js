import React from 'react';
import { X } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

import { setShowPopUp } from './../../Slices/PopUpSlice';
import './PopUpModal.scss';

export default function PopUpModal(props) {

    let dispatch = useDispatch();

    const closeModal = () => {
        dispatch(setShowPopUp(false));
    }

    return(
        <div className={'popup-container'}>
            <div className={'popup-panel'}>
                <div className={'heading-section'}>
                    <div className={'heading'}>
                        <span className={'heading-text'}>{props.heading}</span>
                        <X className={'close-icon'} size={20} onClick={() => closeModal()}/>
                    </div>                    
                </div>
                <div className={'body-section'}>
                    {props.body}
                </div>
            </div>
        </div>
    )
}