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


  if (isFetching) return <Loader />;

  return (
    <>
      <div>Stocks</div>
      <SharedLayout 
        data = {timeseriesmockdata}
      />
      <button onClick={() => setTicker("AAPL")}>
        Click here
      </button>
    </>
  )
}

export default Stocks;