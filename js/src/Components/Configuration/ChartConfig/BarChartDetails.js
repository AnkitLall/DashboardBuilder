import React,{ useState,useLayoutEffect,useRef } from 'react';
import { SketchPicker } from 'react-color';
import { useSelector,useDispatch } from 'react-redux';

import { setFileConfig, setChange } from '../../../Slices/FileConfigSlice';
import '../../../css/BarChartDetails.scss';

export default function BarChartDetails(props) {

    let [showPalette,setShowPalette] = useState(false);
    let [barColor,setBarColor] = useState('');
    let [barColorName,setBarColorName] = useState('');
    let [chartConfig,setChartConfig] = useState({});
    let [yAxisTitle,setYAxisTitle] = useState('');
    let [xAxisTitle,setXAxisTitle] = useState('');

    let dispatch = useDispatch();

    let fileConfig = useSelector(state => state.config.fileConfig);

    const barColorBox = useRef(null);

    const togglePalette = () => {
        if(!chartConfig.editing) {
            return;
        }

        if(showPalette) {
            setShowPalette(false);
            return;
        }

        setShowPalette(true);
    }

    const handleChangeComplete = (color) => {
        let file = {...fileConfig};
        let charts = [...fileConfig.charts];
        setBarColor(color.rgb);      
        setBarColorName(color.hex);  
        let rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a}`
        barColorBox.current.style.backgroundColor = rgba;
        let config = {...chartConfig};
        let barConfig = {...chartConfig.barConfig};
        barConfig.barColor = {name:color.hex,value:rgba};
        config.barConfig = barConfig;
        charts[props.chartIndex] = config;
        file.charts = charts;
        setChartConfig(config);
        dispatch(setFileConfig(file));
        dispatch(setChange(true));
    }

    useLayoutEffect(() => { 
        let config = {...fileConfig.charts[props.chartIndex]};   

        if(!config.barConfig) {
            config['barConfig'] = {};
        }

        if(config.barConfig.barColor) {
            let rgbaValue = config.barConfig.barColor.value;
            barColorBox.current.style.backgroundColor = rgbaValue;
            setBarColor(config.barConfig.barColor.value);
            setBarColorName(config.barConfig.barColor.name);
        }else {
            barColorBox.current.style.backgroundColor = 'steelBlue';
            config.barConfig.barColor = {name:'Steel Blue',value:'steelBlue'};
            setBarColor('steelBlue');
            setBarColorName('Steel Blue');  
        }           
        setChartConfig(config);  
        let yTitle = config.barConfig.yAxisTitle;   
        let xTitle = config.barConfig.xAxisTitle;   
        setYAxisTitle(yTitle?yTitle:'');
        setXAxisTitle(xTitle?xTitle:'')
    },[fileConfig.charts]);

    const setAxisTitle = (event,type) => {
        let file = {...fileConfig};
        let charts = [...fileConfig.charts];
        let axisTitle = event.target.value;
        let config = {...chartConfig};
        let barConfig = {...chartConfig.barConfig};
        if(type === 'yAxis') {
            barConfig.yAxisTitle = axisTitle;
            setYAxisTitle(axisTitle);
        }else if(type === 'xAxis') {
            barConfig.xAxisTitle = axisTitle;
            setXAxisTitle(axisTitle);
        }

        config.barConfig = barConfig;
        charts[props.chartIndex] = config;
        file.charts = charts;
        setChartConfig(config);
        dispatch(setFileConfig(file));
        dispatch(setChange(true));
    }

    return(
        <div className={'bar-chart-container'}>
            {
                <div className={'bar-chart'}>
                    <div className={'title'}>
                        <span className={'title-text'}>Y-Axis Title: </span>
                        {
                            chartConfig.editing?
                            <input 
                                type={'text'} 
                                className={'title-textbox'} 
                                value={yAxisTitle}
                                onChange={(e) => setAxisTitle(e,'yAxis')} 
                            />
                            :
                            <span className={'title-textbox'} >{yAxisTitle}</span>
                        }
                    </div>
                    <div className={'title'}>
                        <span className={'title-text'}>X-Axis Title: </span>
                        {
                            chartConfig.editing?
                            <input 
                                type={'text'} 
                                className={'title-textbox'}
                                value={xAxisTitle}
                                onChange={(e) => setAxisTitle(e,'xAxis')}
                            />
                            :
                            <span className={'title-textbox'} >{xAxisTitle}</span>
                        }
                    </div>
                    <div className={'color-block'}>
                        {
                            chartConfig.editing?
                            <span className={'color-text'}>Select Bar color: </span>
                            :
                            <span className={'color-text'}>Bar color: </span>
                        }
                        <div className={'color-picker-container'}>
                            <div className={'color-info'}>
                                <div ref={barColorBox} className={'color-picker-box'} onClick={togglePalette} />
                                <span className={'color-name'}>{barColorName}</span>
                            </div>
                            
                            {
                                showPalette && chartConfig.editing &&
                                <div className={'color-picker'}>
                                    <SketchPicker
                                        color={barColor}
                                        onChangeComplete={handleChangeComplete}
                                    />
                                </div>
                            }                          
                        </div>                        
                    </div>
                </div>
            }
        </div>
    )
}