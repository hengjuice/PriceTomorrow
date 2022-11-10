import React, { useState } from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Select, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import moment from 'moment'; 
import { useGetMoversQuery } from '../services/rapidApiStocks';
import ArgusTable from './ArgusTable';
const { Title } = Typography;

const StocksHP = () => {
  const { data, isFetching } = useGetMoversQuery();
  //console.log(data);
  const globalStats = data?.finance?.result[0].quotes;
  console.log(globalStats)

  const investmentColumns = [
		{
            headerName: 'Symbol',
            field: 'symbol',
            width: 120,
            filter: 'agTextColumnFilter',
		},
		{
            headerName: 'Name',
            field: 'shortName',
            width: 200,
            filter: 'agTextColumnFilter',
        },
    {
      headerName: 'Market Value',
      field: 'regularMarketChange',
      width: 150,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Market Value',
      field: 'regularMarketChangePercent',
      width: 150,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Previous Close',
      field: 'regularMarketPreviousClose',
      width: 150,
      filter: 'agTextColumnFilter',
      
    },
    {
      headerName: 'Exchange',
      field: 'exchange',
      width: 150,
      filter: 'agTextColumnFilter',
    },
	]

  if (isFetching) return <Loader />
  return (
    <>
      <Title level={2} className="heading">Stock Statistics</Title>
      <h1>Trending Stocks</h1>
      <ArgusTable 
        rowData = {globalStats}
        columnDefs = {investmentColumns}
      />
    </>
  )
}

export default StocksHP