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

  const getTicker = (ticker) => {
    setTicker(ticker);
    console.log("In stock: ", ticker);
  };

  if (isFetching) return <Loader />;

  return (
    <>
      <div>Stocks</div>
      <SharedLayout 
        data = {timeseriesmockdata}
        getTicker = {getTicker}
      />
    </>
  )
}

export default Stocks;