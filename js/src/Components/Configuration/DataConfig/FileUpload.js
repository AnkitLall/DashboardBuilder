import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Select from '../../../Lib/Select/Components/Select';
import CsvConfig from './FileTypes/CsvConfig';
import { setFileConfig,setChange } from '../../../Slices/FileConfigSlice';

export default function FileUpload() {

    let fileConfig = useSelector(state => state.config.fileConfig);

    let dispatch = useDispatch()

    let options = [{
        value: 'csv',
        label: 'CSV'
    },{
        value: 'excel',
        label: 'Excel'
    }];

    const selectFileType = (params) => {
        let config = JSON.parse(JSON.stringify(fileConfig));
        config.data.fileType = (params[0].value === 'selectDefault')?'':params[0].label;
        if(config.table.tableValues) {
            delete config.table.tableValues;
        }        
        dispatch(setFileConfig(config));
        dispatch(setChange(true));
    }

    return(
        <div className={'file-upload-section'}>
            {                
                <div className={'select-file-type'}>
                    <span className={'select-text'}>{fileConfig.data.editing?'Select File Type: ':'File Type: '}</span>
                    <div className={'select-container'}>
                        {
                            fileConfig.data.editing?
                            <Select
                                options={options}
                                selectedOptionValue={fileConfig.data.fileType}
                                onChange={selectFileType}
                            />
                            :
                            <span className={'select-text'}>{fileConfig.data.fileType?fileConfig.data.fileType:''}</span>
                        }
                    </div>
                </div>
            }
            {
                fileConfig.data.fileType === 'CSV' &&
                <CsvConfig />
            }                                              
        </div>
    )
}