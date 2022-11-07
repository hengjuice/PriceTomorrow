import React from 'react'
import { useState } from 'react';
import { useGetStocksQuery } from '../services/stocksApi'
import Loader from './Loader';
import SharedLayout from './SharedLayout';
import { timeseriesmockdata } from './DataViz/mock_data/timeseriesmockdata';

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
      <div>Stocks</div>
      <SharedLayout 
        data = {timeseriesmockdata}
        getTicker = {getTicker}
        getPeriod = {getPeriod}
      />
    </>
  )
}

export default Stocks;