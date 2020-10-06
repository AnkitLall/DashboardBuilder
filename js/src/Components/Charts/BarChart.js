import React, { useRef, useLayoutEffect, useState } from 'react';
import * as d3 from 'd3';
import { useSelector } from 'react-redux';
import { select } from 'd3';

import '../../css/ChartsPage.scss';

export default function BarChart(props) {

    // let [barColor,setBarColor] = useState('');

    var width = 700;
    let height = 500;
    let margin = ({top: 20, right: 0, bottom: 30, left: 40});
    let xRange = [margin.left, width - margin.right];
    let yRange = [height - margin.bottom, margin.top];

    let fileConfig = useSelector(state => state.config.fileConfig);

    let xAxis = useRef(null);
    let yAxis = useRef(null);

    let y = d3.scaleLinear()
        .domain([0, d3.max(fileConfig.table.tableValues,d => d.Value)])
        .range(yRange)

    let x = d3.scaleBand()
        .domain(fileConfig.table.tableValues.map(d => d.Name))
        .rangeRound(xRange)    
        .padding(0.1)

    useLayoutEffect(() => {
        // setBarColor(config.barConfig.barColor.value);
        xAxis.current.setAttribute('transform',`translate(0,${height - margin.bottom})`)
        select(xAxis.current).call(d3.axisBottom(x).tickSizeOuter(0));

        yAxis.current.setAttribute('transform',`translate(${margin.left},0)`)
        select(yAxis.current).call(d3.axisLeft(y));
    },[fileConfig])

    return (
        <div className={'bar-chart-container'}>
            <div className={'bar-chart'}>
                <svg viewBox={[10,0,width,height]}>
                    <g ref={xAxis} />
                    <g ref={yAxis} />
                    <text fontFamily={"sans-serif"} fontSize={15} fontWeight={'bold'} x={20} y={10}>{props.config.yAxisTitle}</text>
                    <text fontFamily={"sans-serif"} fontSize={15} fontWeight={'bold'} x={350} y={500}>{props.config.xAxisTitle}</text>                    
                    {
                        fileConfig.table.tableValues.map((lineItem) => {
                            return <g fill= {props.config.barColor.value}>
                                <rect 
                                    x={x(lineItem.Name)}  
                                    y={y(lineItem.Value)}
                                    height={y(0) - y(lineItem.Value)}
                                    width={x.bandwidth()}
                                />
                            </g>
                        })
                    }
                </svg>
            </div>
        </div>
    )
}