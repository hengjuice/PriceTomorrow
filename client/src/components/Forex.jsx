import React from 'react'
import { useState } from 'react';
import { useGetForexQuery } from '../services/forexApi';
import SharedLayout from './SharedLayout';
import { Typography } from 'antd';
import { timeseriesmockdata } from './DataViz/mock_data/timeseriesmockdata';
import forexData from "../forex_tickers.json";

const { Title } = Typography;

const Forex = () => {
  const [ ticker, setTicker ] = useState();
  const [ period, setPeriod ] = useState("2y");

  const forex_ticker = JSON.parse(JSON.stringify(forexData))

  const getTicker = (param) => {
    setTicker(param + "=X");
    console.log("Ticker | Forex: ", param);
  };

  const getPeriod = (param) => {
    setPeriod(param);
    console.log("Period | Forex", param);
  };

  const arima = useGetForexQuery({model: "ARIMA", ticker: ticker, period: period});

  const lstm = useGetForexQuery({model: "LSTM", ticker: ticker, period: period});

  const rf = useGetForexQuery({model: "RANDOMFOREST", ticker: ticker, period: period});

  return (
    <>
      <Title level={2} className="heading">Forex</Title>
      <SharedLayout
        tickers = {forex_ticker}
        getTicker = {getTicker}
        getPeriod = {getPeriod}
        arima = {arima}
        lstm = {lstm}
        rf = {rf}
      />
    </>
  )
}

export default Forex