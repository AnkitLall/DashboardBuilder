import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import className from 'classnames'

import ChartConfigBlock from './ChartConfigBlock';
import { setFileConfig, setChange } from '../../../Slices/FileConfigSlice';
import { saveConfig } from '../../../Utils/Util';
import '../../../css/ChartConfig.scss';

export default function ChartConfig() {

    let dispatch = useDispatch();

    let fileSelected = useSelector(state => state.files.fileSelected);
    let filesList = useSelector(state => state.files.filesList);
    let fileConfig = useSelector(state => state.config.fileConfig);
    let projectDetails = useSelector(state => state.projectPage.openProjectDeatils); 
    let currentUser = useSelector(state => state.user.currentUser);
    let change = useSelector(state => state.config.change);

    let [chartNum,setChartNum] = useState(-1);
    let [chartsConfig, setChartsConfig] = useState([]);

    useEffect(() => {
        let config = {...fileConfig};
        let chartConfig = [...config.charts];
        if(chartConfig.length && chartNum === -1) {
            setChartNum(0);
        }
        setChartsConfig(chartConfig);
    },[fileConfig]);

    const addNewConfig = () => {
        let file = {...fileConfig};
        let config = [...chartsConfig];
        config.push({});
        setChartsConfig(config);
        setChartNum(config.length-1);  
        file.charts = config;
        saveConfig(
            fileSelected,
            filesList,
            projectDetails,
            currentUser,
            file,
            dispatch,
            setFileConfig
        );
    }

    const enableEdit = () => {
        let file = {...fileConfig};
        let charts = [...chartsConfig];
        let chart = {...charts[chartNum]};
        chart.editing = true;
        charts[chartNum] = chart;
        file.charts = charts;
        dispatch(setFileConfig(file));
    }

    const deleteConfig = () => {
        let file = {...fileConfig};
        let charts = [...fileConfig.charts];        
        charts.splice(chartNum,1);
        if(!fileConfig.charts.length) {
            setChartNum(-1);
        }
        if(chartNum === fileConfig.charts.length-1) {
            setChartNum(chartNum-1);
        }
        file.charts = charts;
        saveConfig(
            fileSelected,
            filesList,
            projectDetails,
            currentUser,
            file,
            dispatch,
            setFileConfig
        );
    }

    const saveData = () => {
        let file = {...fileConfig};
        let charts = [...chartsConfig];
        let chart = {...charts[chartNum]};
        chart.editing = false;
        charts[chartNum] = chart;
        file.charts = charts;

        saveConfig(
            fileSelected,
            filesList,
            projectDetails,
            currentUser,
            file,
            dispatch,
            setFileConfig
        );

        dispatch(setChange(false));
    }

    const cancelSave = () => {
        let file = {...fileConfig};
        let charts = [...chartsConfig];
        let chart = {};
        if(fileConfig.charts[chartNum]) {
            chart = {...fileConfig.charts[chartNum]};
        }
        chart.editing = false;
        charts[chartNum] = chart;
        file.charts = charts;
        dispatch(setFileConfig(file));
        dispatch(setChange(false));
    }
    

    return(
        <div className={'chart-config-container'}>            
            <div className={'action-buttons-container'}>
                {
                    <div className={'action-buttons'}>
                        <button  onClick={addNewConfig} className={'action-button'}>Add Configuration</button>
                    </div>
                }        
            </div> 

            <div className={'chart-container'}>
                {
                    chartsConfig.length ?
                    <div className={'chart-config'}>
                        <div className={'config-buttons-container'}>
                            {
                                chartsConfig[chartNum] && !chartsConfig[chartNum].editing &&
                                <div className={'config-buttons'}>
                                    <button  onClick={enableEdit} className={'config-button'}>Edit Configuration</button>
                                    <button  onClick={deleteConfig} className={'config-button'}>Remove Configuration</button>
                                </div>
                            }
                            {
                                chartsConfig[chartNum] && chartsConfig[chartNum].editing && 
                                <div className={'config-buttons'}>
                                    <button  onClick={saveData} className={'config-button'} disabled={!change}>Save</button>
                                    <button  onClick={cancelSave} className={'config-button'}>cancel</button>
                                </div>
                            }             
                        </div> 
                        <ChartConfigBlock
                            chartIndex={chartNum}
                        />                                   
                        <div className={'chart-nav'}>
                            <span onClick={() => setChartNum(chartNum-1)} 
                                className={(chartNum === 0)?className({'nav-icons-disabled':true}):className({'nav-icons':true})} >
                                {'<'}
                            </span>
                            <div className={'chart-num-block'}>
                                <span>{chartNum+1}</span>
                            </div>                        
                            <span onClick={() => setChartNum(chartNum+1)} 
                                className={(chartNum === chartsConfig.length-1)?className({'nav-icons-disabled':true}):className({'nav-icons':true})} >
                                {'>'}
                            </span>
                        </div>      
                    </div>
                    :
                    <div>No Chart Config</div>                    
                }
            </div>     
        </div>
    )
}