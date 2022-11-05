import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Select, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/rapidApi';


const { Title } = Typography;

const Homepage = () => {
    // const {data, isFetching} = useGetCryptosQuery(10);
    // if (isFetching) return <Loader />;
    
    // const globalStats = data?.data?.stats; 

    return (
        <>
            <Title level={2} className="heading">Welcome to Argus</Title>
        </>
    );
};

export default Homepage