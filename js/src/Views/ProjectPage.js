import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeftCircle } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';

import { setDisplayCheck } from './../Slices/ProjectSlice';
import FileExplorer from './../Components/FileExplorer/FileExplorer';
import FileView from './../Components/FileView';
import MessageModal from '../Modals/MessageModal/MessageModal';
import '../css/ProjectPage.scss';

export default function ProjectPage(props) {

    let dispatch = useDispatch();
    let history = useHistory();

    let [showMessagePopup,setShowMessagePopup] = useState(false);

    let fileConfig = useSelector(state => state.config.fileConfig);    
    let projectDetails = useSelector(state => state.projectPage.openProjectDeatils); 
    let currentUser = useSelector(state => state.user.currentUser);

    const closeMessageModal = () => {
        setShowMessagePopup(false);
    }

    const handleBackButton = () => {
        if(fileConfig.change) {
            setShowMessagePopup(true);
            return;
        }
        dispatch(setDisplayCheck(false));
        history.push('/Projects');
    }

    return(
        <div className={'project-page'}>
            <div className={'header-section'}>
                <div className={'back-button-container'} onClick={() => handleBackButton()}>
                    <ArrowLeftCircle size={30}/>
                </div>    
                <div className={'project-name-container'}>
                    <span className={'project-name'}>
                        {projectDetails.data.projectName}
                    </span>                    
                </div>          
                <div  className={'username-container'}>
                    <button className={(currentUser.name === 'Guest')?'button-round-guest':'button-round-user'}>
                        {currentUser.name[0].toUpperCase()}
                    </button>
                </div>  
            </div>   
            <div className={'body-section'}>
                <FileExplorer 
                    projectDetails={projectDetails}
                />
                <FileView />
            </div> 
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