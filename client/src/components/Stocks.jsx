import React from 'react'
import { useState } from 'react';
import { useGetStocksQuery } from '../services/stocksApi'
import SharedLayout from './SharedLayout';
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

  const getTicker = (param) => {
    setTicker(param);
    console.log("Ticker | Stock: ", param);
  };

  const getPeriod = (param) => {
    setPeriod(param);
    console.log("Period | Stock", param);
  };
  
  const arima = useGetStocksQuery({model: "ARIMA", ticker: ticker, period: period});

  const lstm = useGetStocksQuery({model: "LSTM", ticker: ticker, period: period});

  const rf = useGetStocksQuery({model: "RANDOMFOREST", ticker: ticker, period: period});
  
  return (
    <>
      <Title level={2} className="heading">Stocks</Title>
      <SharedLayout 
        tickers = {stock_tickers}
        getTicker = {getTicker}
        getPeriod = {getPeriod}
        arima = {arima}
        lstm = {lstm}
        rf = {rf}
      />
    </>
  )
}

export default Stocks;