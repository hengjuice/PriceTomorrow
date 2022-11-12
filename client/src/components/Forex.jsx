import React from 'react'
import { useState } from 'react';
import SharedLayout from './SharedLayout';
import { Typography } from 'antd';
import forexData from "../forex_tickers.json";
import { timeseriesmockdata } from './DataViz/mock_data/timeseriesmockdata';

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

  return (
    <>
      <Title level={2} className="heading">Forex</Title>
      <SharedLayout
        tickers = {forex_ticker}
        data = {timeseriesmockdata}
        getTicker = {getTicker}
        getPeriod = {getPeriod}
      />
    </>
  )
}

export default Forex