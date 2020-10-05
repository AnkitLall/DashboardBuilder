import React, { useState } from 'react';

import PanelBody from './PanelBody';
import '../../css/ConfigurationPage.scss';

export default function PanelHeader(props) {

    const getClassNames = (type) => {
        if(props.typeSelected === type) {
            return 'view-selectors-selected';
        }

        return 'view-selectors';
    }

    return(
        <div className={'panel-header-container'}>
            {
                <div className={'panel-header-section'}>    
                    <div className={'before-space'} />                
                    <div className={'header'}>
                        <div className={getClassNames('data')} onClick={() => props.changeType('data')}>
                            <span className={'header-text'}>Data Configuration</span>
                        </div>
                        <div className={getClassNames('table')} onClick={() => props.changeType('table')}>
                            <span className={'header-text'}>Table Configuration</span>
                        </div>
                        <div className={getClassNames('charts')} onClick={() => props.changeType('charts')}>
                            <span className={'header-text'}>Charts Configuration</span>
                        </div>
                    </div>
                    <div className={'after-space'}/>
                </div>
            }
        </div>
    )
} 