import React, { useState, useEffect } from 'react';

import {
    getTableHeaderInfo
} from '../util/GetTableInfo';
import { getCellInfo } from '../util/util';
import './../css/Table.scss';

export default function Table(props) {

    let [columnDefs,setColumnDefs] = useState(props.columnDefs);
    let [rowsData,setRowsData] = useState([]);
    let [tableHeader,setTableHeader] = useState(getTableHeaderInfo(props.columnDefs));
    let [customComponents,setCustomComponents] = useState(props.customComponents);      

    useEffect(() => {        
        // if(props.rowsData !== rowsData) {
            setRowsData(props.rowsData);
        // }
    },[props.rowsData]);

    useEffect(() => {
        if(props.columnDefs !== columnDefs) {
            setColumnDefs(props.columnDefs);
            setTableHeader(getTableHeaderInfo(props.columnDefs));
        }
    },[props.columnDefs]);

    return(
        <div className={'lib-table-container'}>
            <table className={'table'}>
                <thead classnames={'table-headers'}>
                    {                            
                        Object.keys(tableHeader.tableHeadersList).map((tableHeaderList,index) => {
                            let columnRow = tableHeader.tableHeadersList[tableHeaderList].map((columnObj,idx) => {

                                let style = {
                                    width: columnObj.properties.width,
                                    padding: '6px',
                                    'fontWeight': '600',
                                    background: 'gainsboro',
                                    'fontSize': '15px'
                                }

                                return <td  key={idx} 
                                            align={columnObj.properties.alignment} 
                                            style={style}
                                            colSpan={columnObj.properties.colSpan}
                                        >
                                    {columnObj.columnName}
                                </td>
                            });
                    
                            return <tr key={index} className={'header-row'}>{columnRow}</tr>; 
                        })                            
                    }                        
                </thead>
                <tbody classnames={'table-body'}>
                    {
                        
                        rowsData.length ? 
                        rowsData.map((rowData,index) => {                            
                            let row = tableHeader.headersList.map((headerInfo,idx) => {

                                let style = {
                                    padding: '5px',                             
                                    width: headerInfo.width,
                                    'fontSize': '12px'
                                }

                                

                                return (headerInfo.cellRenderer)?
                                        <td 
                                            key={idx}
                                            style={style}
                                            align={headerInfo.alignment}
                                        >
                                            <customComponents.rowCellRenderer
                                                key={idx}
                                                cellInfo={getCellInfo(
                                                    rowData,
                                                    headerInfo,
                                                    rowsData, 
                                                    index, 
                                                    idx
                                                )}
                                                value={rowData[headerInfo.field]}
                                            />
                                        </td>
                                        :<td key={idx} 
                                            align={headerInfo.alignment}
                                            style={style}
                                        >
                                                {rowData[headerInfo.field]}
                                        </td>                                        
                            });                                                            

                            return <tr  key={index}
                                        id={index}                                          
                                        className={'default-row'}>
                                    {row}
                                </tr>                                           
                        })       
                        :
                        
                        customComponents && customComponents['noRowsOverlay']?
                        <div className={'no-rows-container'}>
                            <customComponents.noRowsOverlay />
                        </div>   
                        :
                        <div className={'no-rows-container'}>
                            {'No rows present'}
                        </div>                                                      
                    }
                </tbody>                                                                                                               
            </table> 
        </div>
    )     
}