import React from 'react'
import Plot from 'react-plotly.js';


export default ({precision_recall}) => {
    
    return (
        <Plot
        data={[
          {
            x: Object.values(precision_recall).map(d => d.precision),
            y: Object.values(precision_recall).map(d => d.recall),
            z: Object.values(precision_recall).map(d => d.thresholds),
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
          },
          
        ]}
        layout={ {xaxis: {title: {text: 'Precision'}}, yaxis: {title: {text: 'Recall'}}} }
      />
    )
}
