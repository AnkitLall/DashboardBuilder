import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import ChartsView from './ChartsPage';
import ConfigurationPage from './Configuration/ConfigurationPage';
import MessageModal from '../Modals/MessageModal/MessageModal';
import '../css/FileView.scss';

export default function FileView(props) {

    let [typeSelected, setTypeSelected] = useState('confs');
    let [showMessagePopup,setShowMessagePopup] = useState(false);

    let fileSelected = useSelector(state => state.files.fileSelected);
    let fileConfig = useSelector(state => state.config.fileConfig);

    const closeMessageModal = () => {
        setShowMessagePopup(false);
    }

    const getClassNames = (type) => {

        if(typeSelected === type) {
            return 'file-view-selectors-selected';
        }

        return 'file-view-selectors';
    }

    const changeType = (type) => {        
        if(fileConfig.change) {
            setShowMessagePopup(true);
            return;
        }

        setTypeSelected(type);
    }

    return(
        <div className={'file-view-container'}>
            {
                fileSelected[0] && <div className={'file-view-section'}>                    
                    <div className={'file-view-header-section'}>
                        <div className={getClassNames('confs')} onClick={() => changeType('confs')}>
                            <span>Configuration Page</span>
                        </div>
                        <div className={getClassNames('table')} onClick={() => changeType('table')}>
                            <span>Table View</span>
                        </div>
                        <div className={getClassNames('charts')} onClick={() => changeType('charts')}>
                            <span>Charts View</span>
                        </div>
                    </div>
                </div>
            }
            {
                !fileSelected[0] && <div>
                    No Files.
                </div>
            }
            {
                typeSelected === 'confs' && fileSelected[0] && 
                <ConfigurationPage />
            }
            {
                typeSelected === 'charts' && fileSelected[0] && 
                <ChartsView />
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