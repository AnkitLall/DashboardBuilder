import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { schemeSet2 } from 'd3';

export default function PieChart(props) {

    var data = [9,20,30,8,12];

    let width = 800;
    let height = 600;
    let margin = 40;

    let radius = 450 / 2 - margin;

    let colorScale = d3.scaleOrdinal()
                    .domain(data)
                    .range(schemeSet2)
    
    let pie = d3.pie();

    let arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius)

    let yLabelText = 50;
    let yRect = 40;

    const translate = (x,y) => {
        return `translate(${x},${y})`;
    }

    return(
        <div className={'pie-chart-container'}>
            <div className={'pie-chart'}>
                <svg width={width} height={height} >
                    <g>
                        {
                            data.map((d,idx) => {
                                yLabelText += 20;
                                yRect += 20;
                                return <g>
                                    <rect fill={colorScale(idx)} width={10} height={10} transform={translate(650,yRect)} />
                                    <text transform={translate(670,yLabelText)} >{d}</text>
                                </g>                                
                            })
                        }
                    </g>
                    <g transform={translate(width/2,height/2)} >
                        {
                            pie(data).map((value,idx) => {
                                return <g>
                                    <path d={arc(value)} fill={colorScale(idx)} />
                                    <text
                                        transform={translate(...arc.centroid(value))}
                                        dy={'0.35em'}
                                    >
                                        {value.data}
                                    </text>
                                    </g>
                            })
                        }
                    </g>
                </svg>
            </div>            
        </div>
    )
}