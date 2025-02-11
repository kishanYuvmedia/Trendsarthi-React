import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Row, Col } from "reactstrap";
import Badge from 'react-bootstrap/Badge';

const NightingaleChart = ({ dataList = [], title }) => {  // ✅ Default value added
  const chartRef = useRef(null);
  useEffect(() => {
    let myChart = null;
    if (chartRef.current) {
      myChart = echarts.init(chartRef.current);
      const option = {
        toolbox: {
          show: false,
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 150],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 10,
              color: (params) => (params.data.value >= 1 ? '#0f0' : '#f00'), // ✅ Green for positive, red for negative
            },
            data: dataList,
          },
        ],
      };
      myChart.setOption(option);
    }
    return () => {
      if (myChart) {
        myChart.dispose();
      }
    };
  }, [dataList]); // ✅ Depend on dataList to update when it changes
  return (
    <Row style={{ width: '100%' }}>
      <Col md={8}>
        <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
      </Col>
      <Col md={4}>
        <h4 className='fs-1 fw-bold text-gradient'>{title}</h4>
        <ul class="list-group">
          {dataList.length > 0 ? (
            dataList.map((item, index) => (
              <li key={index} class="list-group-item"> {item.name} added <Badge bg={item.value > 1 ? 'success' : 'danger'}>{item.value}</Badge> pts</li>
            ))
          ) : (
            <p style={{ color: 'white' }}>No data available</p> // ✅ Handle empty list case
          )}
        </ul>
      </Col>
    </Row>
  );
};

export default NightingaleChart;