import React from 'react';

import FileUpload from './FileUpload';
import { useSelector } from 'react-redux';

export default function DataSourceType() {   

    let fileConfig = useSelector(state => state.config.fileConfig);

    return(
        <div className={'data-source-container'}>
            {
                fileConfig.data.dataSource === 'File Upload' &&
                <FileUpload />
            }
        </div>
    )
}