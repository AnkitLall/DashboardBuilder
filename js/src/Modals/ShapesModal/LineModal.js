import React from 'react';

export default function LineModal() {

    return(
        <svg width={'100%'} height={1} style={{'marginBottom': '3px'}}>
            <line 
                x1={0}
                y1={0}
                x2={'100%'}
                y2={0}
                stroke={'black'}
            />
        </svg>
    )
}