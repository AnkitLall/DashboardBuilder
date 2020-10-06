import React from 'react';
import { useSelector } from 'react-redux';

import BarChart from './Charts/BarChart';
import PieChart from './Charts/PieChart';
import GeoMap from './Charts/GeoMap';
import '../css/ChartsPage.scss';

export default function ChartsView() {

    let fileConfig = useSelector(state => state.config.fileConfig);

    return(
        <div className={'chart-view-container'}>
            {/* {
                fileConfig.charts.length ?
                <div className={'chart-view'}>
                    <div className={'charts'}>
                        {
                            fileConfig.charts.map((chartInfo) => {
                                if(chartInfo.chartType.value === 'barChart') {
                                    return <BarChart 
                                        config={chartInfo.barConfig}
                                    />
                                }

                                if(chartInfo.chartType.value === 'pieChart') {
                                    return <PieChart />
                                }
                            })
                        }                                        
                    </div>
                </div>  
                :
                <div>
                    No charts Available.
                </div>
            } */}
            <GeoMap />
        </div>
    )
}