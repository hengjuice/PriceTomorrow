import React from 'react'
import { useState } from 'react';
import { useGetStocksQuery } from '../services/stocksApi'
import Loader from './Loader';
import SharedLayout from './SharedLayout';
import { timeseriesmockdata } from './DataViz/mock_data/timeseriesmockdata';
import { Typography } from 'antd';
import data from "../tickers.json";

const { Title } = Typography;

// get all ticker names from json

var dataString = JSON.stringify(data);
dataString = dataString.split('"').join('');
dataString = dataString.replace('[','');
dataString = dataString.replace(']','');

const stock_tickers = dataString.split(",");

const Stocks = () => {
  const [ ticker, setTicker ] = useState();
  const [ period, setPeriod ] = useState("2y");

  const { data, isFetching } = useGetStocksQuery({ticker: ticker, period: period});
  console.log("data: ", data);

  const getTicker = (param) => {
    setTicker(param);
    console.log("Ticker | Stock: ", param);
  };

  const getPeriod = (param) => {
    setPeriod(param);
    console.log("Period | Stock", param);
  };

  // causes page content to change -> loss in selected values in select buttons
  // if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">Stocks</Title>
      <SharedLayout 
        tickers = {stock_tickers}
        data = {timeseriesmockdata}
        getTicker = {getTicker}
        getPeriod = {getPeriod}
      />
    </>
  )
}

export default Stocks;