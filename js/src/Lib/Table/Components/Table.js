import React, { Component } from 'react';
import classNames from 'classnames';

import {
    getTableHeaderInfo
} from '../util/GetTableInfo';
import './../css/Table.scss';

export default class Table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: props.columnDefs,
            rowsData: props.rowsData,
            tableHeader: getTableHeaderInfo(props.columnDefs),
            customComponents: Object.keys(this.props.customComponents)
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.columnDefs === state.columnDefs && props.rowsData === state.rowsData) {
            return null;
        }

        return {
            columnDefs: props.columnDefs,
            rowsData: props.rowsData,
            tableHeader: getTableHeaderInfo(props.columnDefs)
        }
    }

    actionRowsHandler(params) {
        if(!this.props.actionRows) {
            return;
        }

        let rowId = params.currentTarget.id;
        let row = {
            id: parseInt(rowId),
            data: this.state.rowsData[rowId],
            parent: this.state.rowsData
        };
        this.props.actionRowsHandler(row)
    } 

    render() {
        return(
            <div className={'lib-table-container'}>
                <table className={'table'}>
                    <thead classnames={'table-headers'}>
                        {                            
                            Object.keys(this.state.tableHeader.tableHeadersList).map((tableHeaderList,index) => {
                                let columnRow = this.state.tableHeader.tableHeadersList[tableHeaderList].map((columnObj,idx) => {

                                    let style = {
                                        width: columnObj.properties.width,
                                        padding: '20px'
                                    }

                                    return <th  key={idx} 
                                                align={columnObj.properties.alignment} 
                                                style={style}
                                                colSpan={columnObj.properties.colSpan}
                                            >
                                        {columnObj.columnName}
                                    </th>
                                });
                        
                                return <tr key={index}>{columnRow}</tr>; 
                            })                            
                        }                        
                    </thead>
                    <tbody classnames={'table-body'}>
                        {
                            
                            this.state.rowsData.map((rowData,index) => {
                                let classnames = {
                                    'clickable-row': false,
                                    'default-row': true
                                };
                                if(this.props.actionRows) {
                                    classnames = {
                                        'clickable-row': true,
                                        'default-row': false
                                    }
                                }
                                
                                let row = this.state.tableHeader.headersList.map((headerInfo,idx) => {

                                    let style = {
                                        padding: '20px',
                                    }

                                    return <td key={idx} 
                                                align={headerInfo.alignment}
                                                style={style}
                                            >
                                                    {rowData[headerInfo.field]}
                                            </td>
                                });                                                            

                                return <tr  key={index}
                                            id={index} 
                                            onClick={(params) => this.actionRowsHandler(params)} 
                                            className={classNames(classnames)}>
                                        {row}
                                    </tr>                                           
                            })                                                           
                        }
                    </tbody>                                                                                                               
                </table>    
                {
                    !this.state.rowsData.length ?
                    this.state.customComponents.includes('noRowsOverlay')?
                    <div className={'no-rows-container'}>
                        <this.props.customComponents.noRowsOverlay />
                    </div>   
                    :
                    <div className={'no-rows-container'}>
                        {'No rows present'}
                    </div>  
                    :
                    <div />                
                }        
            </div>
        )
    }    
}