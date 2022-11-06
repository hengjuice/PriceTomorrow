import React, {useState} from 'react';
import { useGetCryptoQuery } from '../services/cryptoApi';
import Loader from './Loader';
import { timeseriesmockdata } from './DataViz/mock_data/timeseriesmockdata';
import SharedLayout from './SharedLayout';


const Crypto = () => {
  const [ symbol, setSymbol ] = useState('BTCUSDT');
  const [ interval, setInterval ] = useState('1d');
  const [ start_str, setStartStr ] = useState('2021.10.1');
  const [ end_str, setEndStr ] = useState('2021.11.1');

  const { data, isFetching } = useGetCryptoQuery({symbol: symbol, interval: interval, start_str: start_str, end_str: end_str});
  console.log("data: ", data);

  const getSymbol = (symbol) => {
    setSymbol(symbol);
  };

  if (isFetching) return <Loader />;

  return (
    <>
      <div>Crypto</div>
      <SharedLayout 
        data = {timeseriesmockdata}
        getSymbol = {getSymbol}
      />
    </>
  )
}

export default Crypto