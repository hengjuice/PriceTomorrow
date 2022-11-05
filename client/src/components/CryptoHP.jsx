import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Select, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment'; 
import { useGetCryptosQuery } from '../services/rapidApi'; // import needed endpoints

const { Title } = Typography;

const CryptoHP = () => {
    const { data, isFetching } = useGetCryptosQuery(10);
    const globalStats = data?.data?.stats;
    if (isFetching) return <Loader />;

    return (
        <>
            <Title level={2} className="heading">Crypto Statistics</Title>
            <Row gutter={[32, 32]}>
                <Col span={12}><Statistic title="Total Assets" value={globalStats.total} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap:" value={`$${millify(globalStats.totalMarketCap)}`} /></Col>
                <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume)}`} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
        </>
    );
};

export default CryptoHP;