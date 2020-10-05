import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fileUploadValidator } from '../../../../Utils/FormValidators';
import { csvParser } from '../../../../Utils/DataParser';
import { setChange } from '../../../../Slices/FileConfigSlice';

export default function CsvConfig() {

    let [errMsg,setErrMsg] = useState('');

    let fileConfig = useSelector(state => state.config.fileConfig)

    let dispatch = useDispatch();

    const uploadFile = (event) => {
        event.preventDefault();

        let file = event.currentTarget['0'].files[0]
        let fileName = file.name;
        let [isValid,fileType] = fileUploadValidator(fileName);

        if(!isValid) {
            setErrMsg('Invalid format!');
            return;
        }

        setErrMsg('');

        if(fileType === 'csv') {
            let config = JSON.parse(JSON.stringify(fileConfig));
            csvParser(file,config,dispatch);
        }        
        dispatch(setChange(true));
    }

    return(
        <div className={'file-upload'}>
            { 
                <div className={'file-upload-view'}>
                    <span className={'file-upload-text'}>Upload csv file </span>
                    {
                        fileConfig.data.editing?
                        <div className={'file-upload-section'}>  
                            <form onSubmit={(e) => uploadFile(e)} className={'file-upload-panel'}>
                                <input type={'file'} className={'file'} /> 
                                <input type={'submit'} value={'Upload'}/>
                            </form>                      
                            <div className={'err-text-container'}>
                                <span className={'err-text'}>{errMsg}</span>  
                            </div> 
                        </div>   
                        :
                        <div className={'file-upload-section'}>  
                            <span>{fileConfig.data.fileName}</span>
                        </div>  
                    }
                </div>
            }
        </div>
    )
}