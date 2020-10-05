import React from 'react';
import { X } from 'react-bootstrap-icons';

import './PopUpModal.scss';

export default function PopUpModal(props) {

    return(
        <div className={'popup-container'}>
            <div className={'popup-panel'}>
                <div className={'heading-section'}>
                    <div className={'heading'}>
                        <span className={'heading-text'}>{props.heading}</span>
                        <X className={'close-icon'} size={20} onClick={() => props.closeModal()}/>
                    </div>                    
                </div>
                <div className={'body-section'}>
                    {props.body}
                </div>
            </div>
        </div>
    )
}