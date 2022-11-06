import React from 'react'
import SharedLayout from './SharedLayout';
import { timeseriesmockdata } from './DataViz/mock_data/timeseriesmockdata';

const Stocks = () => {
  return (
    <>
      <div>Stocks</div>
      <SharedLayout 
        data = {timeseriesmockdata}
      />
    </>
  )
}

export default Stocks