import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { timeseriesmockdata } from './mock_data/timeseriesmockdata';

const PriceChart = (props) => {

    const defaultOptions = {
      chart: {
          type: 'spline',
          zoomType: 'x'
      },
      title: {
          text: props.title
      },
      subtitle: {
          text: document.ontouchstart === undefined ?
              'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis: {
          type: 'datetime'
      },
      yAxis: {
          title: {
              text: 'Market Value'
          }
      },
      legend: {
          enabled: false
      },
      plotOptions: {
          area: {
              fillColor: {
                  linearGradient: {
                      x1: 0,
                      y1: 0,
                      x2: 0,
                      y2: 1
                  },
                  stops: [
                      [0, Highcharts.getOptions().colors[0]],
                      [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                  ]
              },
              marker: {
                  radius: 2
              },
              lineWidth: 1,
              states: {
                  hover: {
                      lineWidth: 1
                  }
              },
              threshold: null
          }
    },
      series: [
          {
              data: props.data,
              name: 'Market Value',
          }
      ]
    };
  
    const dateParser = (variables) => {
  
    }
  
    const [chartOptions, setChartOptions] = useState(defaultOptions);
  
    // How to trigger this while loading
    const setData = () => {
      console.log("setData is called")
          console.log(props.timeSeriesData)
        let data = chartOptions;
        data.series = props.timeSeriesData;
        setChartOptions(chartOptions);
    }
    
    if(props.finshedLoading){
      setData();
    }
  
    return (
        <>
            <div>
                <HighChartsReact 
                    highcharts={Highcharts} options={chartOptions}
                />
            </div>
        </>
    )
  }
  
  export default PriceChart;