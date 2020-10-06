import React from 'react';

import DataConfig from './DataConfig/DataConfig';
import TableConfig from './TableConfig/TableConfig';
import ChartConfig from './ChartConfig/ChartConfig';
import '../../css/ConfigurationPage.scss';

export default function PanelBody(props) {

    return(
        <div className={'panel-body'}>
            {
                props.typeSelected === 'data' && 
                <DataConfig />
            }
            {
                props.typeSelected === 'table' && 
                <TableConfig />
            }
            {
                props.typeSelected === 'charts' &&
                <ChartConfig />
            }
        </div>
    )
}