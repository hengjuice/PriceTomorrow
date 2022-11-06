import React from 'react'
import { useState } from 'react';
import { useGetStocksQuery } from '../services/stocksApi'
import Loader from './Loader';

const Stocks = () => {
  const [ ticker, setTicker ] = useState();
  const [ period, setPeriod ] = useState("2y");

  

  const { data, isFetching } = useGetStocksQuery({ticker: ticker, period: period});
  console.log("data: ", data);


  if (isFetching) return <Loader />;

  return (
    <div>
      <div>Stock</div>
      <button onClick={() => setTicker("AAPL")}>
        Click here
      </button>
    </div>
  )
}

export default Stocks;