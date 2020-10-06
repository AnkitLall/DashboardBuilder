import React, { useRef,useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFileConfig,setChange } from '../../../Slices/FileConfigSlice';
import Select from '../../../Lib/Select/Components/Select';
import { saveConfig } from '../../../Utils/Util';
import '../../../css/TableConfig.scss';

export default function TableConfig() {
    let fileConfig = useSelector(state => state.config.fileConfig);    
    let projectDetails = useSelector(state => state.projectPage.openProjectDeatils); 
    let currentUser = useSelector(state => state.user.currentUser);
    let fileSelected = useSelector(state => state.files.fileSelected);
    let filesList = useSelector(state => state.files.filesList);
    let change = useSelector(state => state.config.change);

    let configPanel = useRef();

    let [options,setOptions] = useState([]);
    let [tableConfig,setTableConfig] = useState(fileConfig.table);
    let [errMsg,setErrMsg] = useState('');
    let [saveDisabled,setSaveDisabled] = useState(true);

    const dispatch = useDispatch();    

    const saveData = () => {
        let file = {...fileConfig};
        let table = {...tableConfig};
        table.editing = false;    
        let rowRange = {...table.rowRange};    

        if(!table.rowRange.lowerLimit) {
            rowRange.lowerLimit = 1;
        }

        if(!table.rowRange.upperLimit) {
            rowRange.upperLimit = table.tableValues.length;
        }
        
        table.rowRange = rowRange;
        file.table = table;

        saveConfig(
            fileSelected,
            filesList,
            projectDetails,
            currentUser,
            file,
            dispatch,
            setFileConfig
        )      
        
        dispatch(setChange(false));
    }

    const deleteConfig = () => {
        let config = {...fileConfig};
        let table = {...tableConfig};
        delete table.selectedColumns;
        delete table.rowRange;
        table.editing = false;
        setTableConfig(table);
        config.table = table;

        saveConfig(
            fileSelected,
            filesList,
            projectDetails,
            currentUser,
            config,
            dispatch,
            setFileConfig
        )   
    }

    const cancelSave = () => {
        let file = {...fileConfig};
        let config = {...file.table};
        config.editing = false;
        file.table = config;
        setTableConfig({...fileConfig.table});
        dispatch(setFileConfig(file));
        dispatch(setChange(false));
    } 

    const enableEdit = () => {
        let file = {...fileConfig};
        let config = {...file.table};        
        config.editing = true;
        file.table = config;
        setTableConfig(config);
        dispatch(setFileConfig(file));
    }

    useEffect(() => {
        if(!fileConfig.table.tableValues) {
            return;
        }

        let table = {...fileConfig.table};
        let columns = table.columns?table.columns:[];
        let optionObj = columns.map((column) => {
            return {label: column, value: column};
        })        
        setOptions(optionObj);

        if(!table.rowRange) {
            let range = {
                lowerLimit: 1,
                upperLimit: table.tableValues.length
            }
            table.rowRange = range;
        }        

        setTableConfig(table);

    },[fileConfig]);

    useEffect(() => {
        if(!fileConfig.table.tableValues) {
            return;
        }

        if(tableConfig.selectedColumns && tableConfig.selectedColumns.length && change) {
            setSaveDisabled(false);
        }else {
            setSaveDisabled(true);
        }
    },[tableConfig])

    const setColumns = (params) => {
        let table = {...tableConfig};
        let columns = [];
        params.forEach((column) => {
            if(column.value !== 'selectDefault') {
                columns.push(column.label);
            }
        });
        table.selectedColumns = columns
        setTableConfig(table);
        dispatch(setChange(true));
    }

    const setLimit = (e,type) => {
        let value = e.target.value;

        if(value && !value.match(/^[0-9]+$/)) {
            setErrMsg('Values must be integers');
            return;
        }

        let valueInt = parseInt(value);
        if(valueInt && (valueInt < 1 || valueInt > tableConfig.tableValues.length)) {
            setErrMsg('Limit must be > 0 and <= number of line items in data.');
            return;
        }

        if(valueInt && (valueInt < tableConfig.rowRange.lowerLimit && type === 'upper')) {
            setErrMsg('Upper limit must always be >= lower limit');
            return;
        }
        
        setErrMsg('');
        let table = {...tableConfig};
        let rowRange = {...table.rowRange};
        if(type === 'lower') {
            rowRange.lowerLimit = isNaN(valueInt)?value:valueInt;
        }else if(type === 'upper') {
            rowRange.upperLimit = isNaN(valueInt)?value:valueInt;
        }
        table.rowRange = rowRange;
        setTableConfig(table);
        // dispatch(setFileConfig(file));
        dispatch(setChange(true));
    }

    return(
        <div className={'table-config-container'}>            
            <div className={'action-buttons-container'}>
                {
                    !fileConfig.table.editing && fileConfig.table.selectedColumns &&
                    <div className={'action-buttons'}>
                        <button  onClick={enableEdit} className={'action-button'}>Edit Configuration</button>
                        <button  onClick={deleteConfig} className={'action-button'}>Remove Configuration</button>
                    </div>
                }
                {
                    fileConfig.table.editing && 
                    <div className={'action-buttons'}>
                        <button  onClick={saveData} className={'action-button'} disabled={saveDisabled}>Save</button>
                        <button  onClick={cancelSave} className={'action-button'}>cancel</button>
                    </div>
                }     
                {
                    !fileConfig.table.editing && !fileConfig.table.selectedColumns &&
                    <div className={'action-buttons'}>
                        <button  onClick={enableEdit} className={'action-button'} disabled={!fileConfig.table.tableValues} >Add Configuration</button>
                    </div>
                }             
            </div>      
            {                            
                fileConfig.table.tableValues?
                <div ref={configPanel} className={'table-config-panel'}>    
                    {                    
                        fileConfig.table.editing && 
                        <div className={'table-config-view'}>
                            <div className={'select-table'}>
                                <span className={'select-text'}>{fileConfig.table.editing?'Select Columns: ':'Selected Columns: '}</span>
                                <div className={'select-container'}>
                                    {
                                        fileConfig.table.editing?
                                        <Select
                                            options={options}
                                            multiple={true}
                                            onChange={setColumns}
                                        />
                                        :
                                        tableConfig.selectedColumns && tableConfig.selectedColumns.map((columnName,idx) => {
                                            return <span key={idx}>{`${(idx !== 0)?', ':''}${columnName}`}</span>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={'range-panel'}>
                                <span className={'range-text'}>{fileConfig.table.editing?'Select Row range: ':'Selected Row range: '}</span>
                                {
                                    fileConfig.table.editing?
                                    <form className={'range-form'}>
                                        <input 
                                            defaultValue={tableConfig.rowRange && tableConfig.rowRange.lowerLimit?tableConfig.rowRange.lowerLimit:1} 
                                            type={'text'} 
                                            onChange={(e) => setLimit(e,'lower')} 
                                        />
                                        <span> - </span>
                                        <input 
                                            defaultValue={tableConfig.rowRange && tableConfig.rowRange.upperLimit?tableConfig.rowRange.upperLimit:tableConfig.tableValues.length} 
                                            type={'text'} 
                                            onChange={(e) => setLimit(e,'upper')} 
                                        />
                                    </form>
                                    :
                                    tableConfig.rowRange && 
                                    <div className={'range-form'}>
                                        <span>{tableConfig.selectedColumns?tableConfig.rowRange.lowerLimit:''}</span>
                                        <span> - </span>
                                        <span>{tableConfig.selectedColumns?tableConfig.rowRange.upperLimit:''}</span>
                                    </div>  
                                }
                                <div className={'err-text-container'}>
                                    <span className={'err-text'}>{errMsg}</span>  
                                </div>   
                            </div>
                        </div>
                    }
                    {
                        !fileConfig.table.editing && fileConfig.table.selectedColumns? 
                        <div className={'table-config-view'}>
                            <div className={'select-table'}>
                                <span className={'select-text'}>{'Selected Columns: '}</span>
                                <div className={'select-container'}>
                                    {                                        
                                        tableConfig.selectedColumns && tableConfig.selectedColumns.map((columnName,idx) => {
                                            return <span key={idx}>{`${(idx !== 0)?', ':''}${columnName}`}</span>
                                        })
                                    }
                                </div>
                            </div>
                            <div className={'range-panel'}>
                                <span className={'range-text'}>{'Selected Row range: '}</span>
                                {
                                    tableConfig.rowRange && 
                                    <div className={'range-form'}>
                                        <span>{tableConfig.selectedColumns?tableConfig.rowRange.lowerLimit:''}</span>
                                        <span> - </span>
                                        <span>{tableConfig.selectedColumns?tableConfig.rowRange.upperLimit:''}</span>
                                    </div>  
                                }
                                <div className={'err-text-container'}>
                                    <span className={'err-text'}>{errMsg}</span>  
                                </div>   
                            </div>
                        </div>
                        :
                        <div>
                            No configuration added
                        </div>
                    }                    
                </div>
                :
                <div>
                    No file Added. Please upload data in Data configuration tab frist.
                </div>
            }
        </div>        
    );
}