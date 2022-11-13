import React from 'react';
import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import Loader from '../Loader';

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
              data: props.query?.data?.predictedTickerTimeSeries,
              name: 'Market Value',
          }
      ]
    };
  
    const dateParser = (variables) => {
  
    }
  
    if (props.query?.isLoading) return <Loader />;

    return (
        <>
            <div>
                <HighChartsReact 
                    highcharts={Highcharts} options={defaultOptions}
                />
            </div>
        </>
    )
  }
  
  export default PriceChart;