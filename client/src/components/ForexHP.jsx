import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Select, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment'; 
import { useGetRecentRatesQuery } from '../services/rapidApiForex';

const { Title } = Typography;

const ForexHP = () => {
  const { data,isFetching } = useGetRecentRatesQuery();
  console.log(data);
  
  if (isFetching) return <Loader />
  return (
    <div>ForexHP</div>
  )
}

export default ForexHP