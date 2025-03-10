import React, { useRef, useEffect, useState } from 'react';
import * as echarts from 'echarts';
import moment from 'moment';

const CandlestickChart = ({datalist}) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const processedData = rawData.map(item => ({
      time: moment(item.LASTTRADETIME).toDate(), // Convert timestamp to Date object
      open: item.OPEN,
      high: item.HIGH,
      low: item.LOW,
      close: item.CLOSE,
    }));

    setData(processedData);

  }, []); // Run once on mount to set data

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const chartInstance = echarts.init(chartRef.current);
      setChart(chartInstance);

      const option = {
        title: {
          text: 'Chart',
          left: 0,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%',
        },
        xAxis: {
          type: 'time', // Use 'time' for date/time axis
          data: datalist.map(item => item.time),
          axisLabel: {
            formatter: (value) => {
              return echarts.format.formatTime('HH:mm', value); // Format time as needed
            },
          },
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true,
          },
        },
        dataZoom: [
          {
            type: 'inside',
            start: 50,
            end: 100,
          },
          {
            show: true,
            type: 'slider',
            top: '90%',
            start: 50,
            end: 100,
          },
        ],
        series: [
          {
            name: 'chart',
            type: 'candlestick',
            data: datalist.map(item => [item.open, item.high, item.low, item.close]),
            itemStyle: {
              color: '#ec0000', // Up color
              color0: '#00da3c', // Down color
              borderColor: '#8A0000', // Up border color
              borderColor0: '#008F28', // Down border color
            },
          },
        ],
      };

      chartInstance.setOption(option);

      const resizeHandler = () => chartInstance.resize();
      window.addEventListener('resize', resizeHandler);

      return () => {
        chartInstance.dispose();
        window.removeEventListener('resize', resizeHandler);
        setChart(null);
      };
    }
  }, [data]); // Data as dependency

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default CandlestickChart;