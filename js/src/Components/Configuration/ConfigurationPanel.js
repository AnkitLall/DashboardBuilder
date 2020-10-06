import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PanelHeader from './PanelHeader';
import PanelBody from './PanelBody';
import MessageModal from '../../Modals/MessageModal/MessageModal';
import '../../css/ConfigurationPage.scss';

export default function ConfigurationPanel() {

    let [typeSelected,setTypeSelected] = useState('data');
    let [showMessagePopup,setShowMessagePopup] = useState(false);

    let fileConfig = useSelector(state => state.config.fileConfig);

    const closeMessageModal = () => {
        setShowMessagePopup(false);
    }

    const changeType = (type) => {        
        if(fileConfig.change) {
            setShowMessagePopup(true);
            return;
        }

        setTypeSelected(type);
    }

    return(
        <div className={'config-panel'}>
            {
                <PanelHeader 
                    typeSelected={typeSelected}
                    changeType={changeType}
                />
            }

            {
                <PanelBody 
                    typeSelected={typeSelected}
                />
            } 
            {
                showMessagePopup && 
                <MessageModal 
                    msg={'You have unsaved configuration!!'}
                    closeMessageModal={closeMessageModal}
                />
            }           
        </div>
    )
}