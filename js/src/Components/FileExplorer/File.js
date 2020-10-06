import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import className from 'classnames';

import { setFileDetails } from '../../Slices/FilesSlice';
import { setFileConfig } from '../../Slices/FileConfigSlice';
import MessageModal from '../../Modals/MessageModal/MessageModal';
import '../../css/FileExplorer.scss';

export default function File(props) {

    let [file,setFile] = useState({});
    let [fileClass,setFileClass] = useState('file');
    let [showMessagePopup,setShowMessagePopup] = useState(false);

    let fileSlected = useSelector(state => state.files.fileSelected);
    let fileConfig = useSelector(state => state.config.fileConfig);

    let dispatch = useDispatch();

    const closeMessageModal = () => {
        setShowMessagePopup(false);
    }

    const selectFile = (event) => {
        if(fileConfig.change) {
            setShowMessagePopup(true);
        }
        
        let isMultiple = event.ctrlKey?true:false;
        setFileClass({'file-selected': true});
        dispatch(setFileDetails({name:file.fileName,isMultiple:isMultiple}));
        dispatch(setFileConfig(file.fileConfig));        
    }

    useEffect(() => {
        if(fileSlected.includes(props.file.fileName)) {
            setFileClass({'file-selected': true});
        }else {
            setFileClass({'file': true});
        }
    },[fileSlected]);

    useEffect(() => {        
        setFile(props.file);
    },[props.file.fileName]);

    return(
        <div className={'file-container'}>
            <div className={className(fileClass)} onClick={(e) => {selectFile(e)}}>
                <span className={'file-text'}>
                    {file.fileName}
                </span>            
            </div>
            {
                showMessagePopup && 
                <MessageModal 
                    errorMsg={'You have unsaved configuration!!'}
                    closeMessageModal={closeMessageModal}
                />
            } 
        </div>        
    )
}