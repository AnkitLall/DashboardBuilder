import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import File from './File';
import { setFileDetails } from '../../Slices/FilesSlice';
import { setFileConfig,setOriginalConfig } from '../../Slices/FileConfigSlice';
import '../../css/FileExplorer.scss'

export default function FilesList(props) {

    let dispatch = useDispatch();

    let filesList = useSelector(state => state.files.filesList);

    useEffect(() => {
        if(filesList.length) {
            let fieConfig = {...filesList[0].fileConfig};
            fieConfig['change'] = false;
            dispatch(setFileDetails({name:filesList[0].fileName,isMultiple:false}));
            dispatch(setFileConfig(fieConfig));
            dispatch(setOriginalConfig(fieConfig));
        }        
    },[filesList])

    return(
        <div className={'files-list-container'}>
            {
                filesList.map((file,idx) => {
                    return  <File key={idx} file={file}/>
                })
            }
            {
                !filesList.length && 
                <div className={'no-files'}>
                    No Files.
                </div>
            }
        </div>
    );
}