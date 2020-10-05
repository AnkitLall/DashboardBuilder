import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';

import BarChartDetails from './BarChartDetails';
import Select from '../../../Lib/Select/Components/Select';
import { setFileConfig,setChange } from '../../../Slices/FileConfigSlice';
import '../../../css/ChartConfig.scss';

export default function ChartConfigBlock(props) {

    let [chartConfig,setChartConfig] = useState({});

    let dispatch = useDispatch();

    let fileConfig = useSelector(state => state.config.fileConfig);

    let options = [{
        value: 'barChart',
        label: 'Bar Chart'
    },{
        value: 'pieChart',
        label: 'Pie Chart'
    }];

    const onSelectChartType = (params) => {
        let name = params[0].label;
        let value = params[0].value;

        if(params.value === 'selectDefault') {
            name = '';
            value = '';
        }

        let file = {...fileConfig};
        let charts = [...fileConfig.charts];
        let chartType = {
            name: params[0].label,
            value: params[0].value
        };
        let config = {...chartConfig};
        config.chartType = chartType;
        charts[props.chartIndex] = config;
        file.charts = charts;
        setChartConfig(config);
        dispatch(setFileConfig(file));
        dispatch(setChange(true));
    }

    const setChartName = (event) => {
        let file = {...fileConfig};
        let charts = [...fileConfig.charts];
        let chartName = event.target.value;
        let config = {...chartConfig};
        config.chartName = chartName;
        charts[props.chartIndex] = config;
        file.charts = charts;
        setChartConfig(config);
        dispatch(setFileConfig(file));
        dispatch(setChange(true));
    }

    useEffect(() => {
        let config = {...fileConfig.charts[props.chartIndex]};
        setChartConfig(config);
    },[fileConfig,props.chartIndex]);

    return(
        <div className={'chart-config-block'}>
            {
                chartConfig.editing?
                <div className={'chart-options'}>
                    <div className={'chart-type'}>                                                
                        <span className={'chart-text'}>Select Chart Type: </span>                        
                        <div className={'chart-type-select'}>
                            {
                                chartConfig.editing &&
                                <Select
                                    options={options}
                                    onChange={onSelectChartType}
                                    selectedOptionValue={chartConfig.chartType?chartConfig.chartType.value:''}
                                />
                            }
                        </div>
                    </div>
                    <div className={'chart-name'}>
                        <span className={'chart-text'}>Enter Chart Name: </span>
                        <input 
                            type={'text'} 
                            className={'chart-name-textbox'} 
                            value={chartConfig.chartName?chartConfig.chartName:''} 
                            onChange={(e) => setChartName(e)} 
                        />
                    </div>               
                </div>
                :
                chartConfig.chartType?
                <div className={'chart-options'}>
                    <div className={'chart-type'}>
                        <span className={'chart-text'}>Chart Type: </span>                        
                        <div className={'chart-type-select'}>
                            <span className={'chart-text'}>{chartConfig.chartType?chartConfig.chartType.name:''}</span>                            
                        </div>
                    </div>
                    <div className={'chart-name'}>
                        <span className={'chart-text'}>Chart Name: </span>            
                        <div className={'chart-name-textbox'} >
                            <span className={'chart-text'}>{chartConfig.chartName?chartConfig.chartName:''} </span>
                        </div>                        
                    </div>               
                </div>
                :
                <div>
                    No configuration
                </div>
            }

            {chartConfig.chartType && chartConfig.chartType.value === 'barChart' && 
                <BarChartDetails 
                    chartIndex={props.chartIndex}
                />
            }
        </div>
    )
}