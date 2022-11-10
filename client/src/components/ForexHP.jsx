import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Select, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment'; 
import { useGetRecentRatesQuery } from '../services/rapidApiForex';
import ArgusTable from './ArgusTable';


const { Title } = Typography;

const ForexHP = () => {
  const { data,isFetching } = useGetRecentRatesQuery();
  const globalStats = data;
  console.log(data);

  const investmentColumns = [
		{
            headerName: 'Ticker',
            field: 'ticker',
            width: 120,
            filter: 'agTextColumnFilter',
		},
		{
            headerName: 'Price',
            field: 'price',
            width: 120,
            filter: 'agTextColumnFilter',
        },
    {
      headerName: 'perf_day',
      field: 'perf_day',
      width: 120,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'perf_half',
      field: 'perf_half',
      width: 120,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'perf_hour',
      field: 'perf_hour',
      width: 120,
      filter: 'agTextColumnFilter',
      
    },
    {
      headerName: 'perf_month',
      field: 'perf_month',
      width: 120,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'perf_quart',
      field: 'perf_quart',
      width: 120,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'perf_week',
      field: 'perf_week',
      width: 120,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'perf_year',
      field: 'perf_year',
      width: 120,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'perf_ytd',
      field: 'perf_ytd',
      width: 120,
      filter: 'agTextColumnFilter',
    },
    
	]

  
  if (isFetching) return <Loader />
  return (
    <>
    <Title level={2} className="heading">Forex Statistics</Title>
      <h1>Popular Pairs</h1>
      <ArgusTable 
        rowData = {globalStats}
        columnDefs = {investmentColumns}
      />
    </>
  )
}

export default ForexHP