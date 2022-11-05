import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Select, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment'; 
import { useGetRecommendationsQuery } from '../services/rapidApiStocks';

const { Title } = Typography;

const StocksHP = () => {
  const { data, isFetching } = useGetRecommendationsQuery();
  const globalStats = data?.finance?.result[0].quotes;
  if (isFetching) return <Loader />
  return (
    <>
      <Title level={2} className="heading">Stocks Statistics</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="1:" value={globalStats[0].symbol} /></Col>
        <Col span={12}><Statistic title="2" value={millify(globalStats[1].symbol)} /></Col>
        <Col span={12}><Statistic title="3:" value={`$${millify(globalStats[2].symbol)}`} /></Col>
        <Col span={12}><Statistic title="4:" value={`$${millify(globalStats[3].symbol)}`} /></Col>
        <Col span={12}><Statistic title="5:" value={millify(globalStats[4].symbol)} /></Col>
      </Row>
    </>
  )
}

export default StocksHP