import React from 'react';

import ConfigurationPanel from './ConfigurationPanel';
import '../../css/ConfigurationPage.scss';

export default function ConfigurationPage(props) {    

    return(
        <div className={'configuration-page-container'}>
            <div className={'panel'}>
                <ConfigurationPanel />
            </div>
        </div>
    );
}