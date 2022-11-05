import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Select, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment';
import CryptoHP from './CryptoHP';
import StocksHP from './StocksHP';
import { useGetCryptosQuery } from '../services/rapidApi';


const { Title } = Typography;

const Homepage = () => {
    // Stocks

    // Forex

    // Crypto

    // News (if got time to do)
    // const { data, isFetching } = useGetCryptosQuery(10);
    // const globalStats = data?.data?.stats;
    // if (isFetching) return <Loader />;

    return (
        <>
            <Title level={2} className="heading">Welcome to Argus</Title>
            <CryptoHP />
            <StocksHP />
        </>
    )
}

export default Homepage