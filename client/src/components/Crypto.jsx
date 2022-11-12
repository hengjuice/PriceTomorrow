import React, {useState} from 'react';
import { useGetCryptoQuery } from '../services/cryptoApi';
import Loader from './Loader';
import { timeseriesmockdata } from './DataViz/mock_data/timeseriesmockdata';
import SharedLayout from './SharedLayout';
import { Typography } from 'antd';
import cryptoData from "../crypto_tickers.json";

const { Title } = Typography;

const Crypto = () => {
  const [ symbol, setSymbol ] = useState('BTCUSDT');
  const [ interval, setInterval ] = useState('1d');
  const [ start_str, setStartStr ] = useState('2021.10.1');
  const [ end_str, setEndStr ] = useState('2021.11.1');

  const { data, isFetching } = useGetCryptoQuery({symbol: symbol, interval: interval, start_str: start_str, end_str: end_str});
  console.log("data: ", data);

  const crypto_ticker = JSON.parse(JSON.stringify(cryptoData));

  const getSymbol = (symbol) => {
    setSymbol(symbol + "USDT");
    console.log("Crypto | symbol", symbol);
  };

  const dateToStr = (date) => {
    var yyyy = date.getFullYear();
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var dd = String(date.getDate() - 1).padStart(2, '0');
    return yyyy + '.' + mm + '.' + dd;
  }

  const getStartEndStr = (period) => {
    var date = new Date();
    setEndStr( dateToStr(date) );
    console.log("Crypto | end str", end_str);

    // minus period from end date (today)
    if (period.includes('y')) {
      date.setFullYear(date.getFullYear() - parseInt(period.substring(0, period.length-1)));
    }
    else if (period.includes('mo')) {
      date.setMonth(date.getMonth() - parseInt(period.substring(0, period.length-2)));
    }
    else {
      date.setDate(date.getDate - parseInt(period.substring(0, period.length-1)));
    }

    setStartStr( dateToStr(date) );
    console.log("Crypto | start str", start_str);
  };

  if (isFetching) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">Crypto</Title>
      <SharedLayout
        tickers = {crypto_ticker}
        data = {timeseriesmockdata}
        getTicker = {getSymbol}
        getPeriod = {getStartEndStr}
      />
    </>
  )
}

export default Crypto