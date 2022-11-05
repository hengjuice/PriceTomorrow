import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Select, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment'; 
import { useGetMoversQuery } from '../services/rapidApiStocks';

const { Title } = Typography;

const StocksHP = () => {
  const { data, isFetching } = useGetMoversQuery();
  console.log(data);
  const globalStats = data?.finance?.result[0].quotes;
  if (isFetching) return <Loader />
  return (
    <>

    </>
  )
}

export default StocksHP