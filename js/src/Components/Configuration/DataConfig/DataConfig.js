import React,{ useRef, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DataSourceType from './DataSourceType';
import Select from '../../../Lib/Select/Components/Select';
import { setFileConfig,setChange } from '../../../Slices/FileConfigSlice';
import { saveConfig } from '../../../Utils/Util';
import '../../../css/DataConfig.scss'

export default function DataConfig() {

    let configPanel = useRef();

    let dispatch = useDispatch();

    let fileSelected = useSelector(state => state.files.fileSelected);
    let filesList = useSelector(state => state.files.filesList);
    let fileConfig = useSelector(state => state.config.fileConfig);
    let projectDetails = useSelector(state => state.projectPage.openProjectDeatils); 
    let currentUser = useSelector(state => state.user.currentUser);
    let originalFileConfig = useSelector(state => state.config.originalFileConfig);
    let change = useSelector(state => state.config.change);

    let options = [{
        value: 'fileUpload',
        label: 'File Upload'
    },{
        value: 'api',
        label: 'Api link'
    }];

    const selctDataSource = (params) => {
        let config = {};
        config = {
            data: {
                dataSource: (params[0].value === 'selectDefault')?'':params[0].label,
                editing: true
            },
            table: {
                rowRange:{}
            },
            charts: [],
        }
        dispatch(setFileConfig(config));
        dispatch(setChange(true));
    }

    const saveData = () => {
        let file = {...fileConfig};
        let config = {...file.data};
        config.editing = false;
        file.data = config;
        dispatch(setChange(false));
        saveConfig(
            fileSelected,
            filesList,
            projectDetails,
            currentUser,
            file,
            dispatch,
            setFileConfig
        )
    }

    const cancelSave = () => {
        let config = Object.keys(originalFileConfig).length?originalFileConfig:{
            data: {editing:false},
            table: {},
            charts: [],
        };
        dispatch(setFileConfig(config));
        dispatch(setChange(false));
    }

    const enableEdit = () => {
        let file = {...fileConfig};
        let config = {...file.data};
        config.editing = true;
        file.data = config
        dispatch(setFileConfig(file));
    }

    const deleteConfig = () => {
        let config = {...fileConfig};
        config.data = {};
        config.table = {};

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

    useLayoutEffect(() => {
        configPanel.current.scrollTo(0,configPanel.current.scrollHeight);
    });

    return(
        <div className={'data-config-container'}>            
            <div className={'action-buttons-container'}>                
                {
                    !fileConfig.data.editing && fileConfig.data.dataSource &&
                    <div className={'action-buttons'}>
                        <button  onClick={enableEdit} className={'action-button'}>Edit Configuration</button>
                        <button  onClick={deleteConfig} className={'action-button'}>Remove Configuration</button>
                    </div>
                }
                {
                    !fileConfig.data.editing && !fileConfig.data.dataSource &&
                    <div className={'action-buttons'}>
                        <button  onClick={enableEdit} className={'action-button'}>Add Configuration</button>
                    </div>
                }
                {
                    fileConfig.data.editing && 
                    <div className={'action-buttons'}>
                        <button  onClick={saveData} className={'action-button'} disabled={!change}>Save</button>
                        <button  onClick={cancelSave} className={'action-button'}>cancel</button>
                    </div>
                }                
            </div>            
            <div ref={configPanel} className={'data-config-panel'}>                                       
                <div className={'panel'}>              
                    {                         
                        fileConfig.data.editing &&
                        <div className={'select-data-source'}>
                            <span className={'select-text'}>{'Select Data Source: '}</span>
                            <div className={'select-container'}>                                
                                <Select
                                    options={options}
                                    selectedOptionValue={fileConfig.data.dataSource}
                                    onChange={selctDataSource}
                                />                                
                            </div>
                        </div>
                    }    
                    {   
                        fileConfig.data.dataSource?                      
                        !fileConfig.data.editing && <div className={'select-data-source'}>
                            <span className={'select-text'}>{'Data Source: '}</span>
                            <div className={'select-container'}>
                                {
                                    <span className={'select-text'}>{fileConfig.data.dataSource}</span>
                                }
                            </div>
                        </div>
                        :
                        !fileConfig.data.editing && <div>
                            No data uploaded.
                        </div>
                    }                 
                    <DataSourceType />           
                </div>                 
            </div>            
        </div>
    )
}