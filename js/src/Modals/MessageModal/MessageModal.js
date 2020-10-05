import React, { useState } from 'react';
import { InfoCircleFill,XCircle } from 'react-bootstrap-icons';

import './MessageModal.scss';

export default function MessageModal(props) {

    let [messageType,setMessageType] = useState(props.messageType?props.messageType:'error');
    
    return(
        <div className={'popup-container'}>
            <div className={'error-panel'}>
                <div className={'icon-section'}>
                    {
                       messageType === 'error' && <XCircle size={60} color={'red'} />
                    }                    
                    {
                        messageType === 'info' && <InfoCircleFill size={60} fill={'#24B7D3'}/>
                    }
                </div>                
                <div className={'body-section'}>
                    <div className={'message-container'}>
                        {props.msg}
                    </div>  
                    <div className={'button-container'}>
                        <button className={'okay-button'} onClick={() => props.closeMessageModal()}>
                            Okay
                        </button>
                    </div>                                      
                </div>
            </div>
        </div>
    )
}