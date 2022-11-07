import yfinance as yf
from binance.client import Client
from typing import Optional, Union

from fastapi import FastAPI
import json
import pandas as pd
import jsonpickle

from utility.timeSeries import getTimeSeries
from predictionModels.lstm import predictLSTM
from predictionModels.arima import predictARIMA
from returnClasses import Crypto

api_key = "xUUAHD0zr0sZgbl6IVMkPNeiiDWUUZgg80tjT05iKXSWTtLkXjx5w7tpDsyjF281"
api_secret = "rWULkBSHUf5FLHPaBvrBX7hiHjz4nlVWDuud14QJZ94Bccse0ZlQh0IL91ouqHnH"
# client=Client(api_key,api_secret)

app = FastAPI()

def nest(d: dict) -> dict:
    result = {}
    for key, value in d.items():
        target = result
        for k in key[:-1]:  # traverse all keys but the last
            target = target.setdefault(k, {})
        target[key[-1]] = value
    return result

def parse_df_default(df):
    res = df.to_json(orient="index")
    parsed = json.loads(res)
    return parsed     

def parse_df(df, ticker):
    if not isinstance(df.columns, pd.MultiIndex):
        df.columns = pd.MultiIndex.from_product([[ticker], df.columns])

    df.reset_index(inplace=True)
    df['Date'] = (df['Date'] - pd.Timestamp("1970-01-01"))
    df.set_index('Date', inplace=True)
    d = df.to_dict(orient='index')
    res = {k: nest(v) for k, v in d.items()}
    return res

@app.get("/")
def read_root():
    return {"Hello": "world"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

"""
    Reads all crypto info

    Response JSON format:

"""
@app.get("/all-crypto/")
def get_all_crypto_data():
    client=Client(api_key,api_secret)
    data = client.get_all_tickers()
    data_df = pd.DataFrame(data)

    return parse_df_default(data_df)

"""
    Read singular crypto info for specified time period to current day
    - **symbol**: required symbol name

    - **interval**: an interval in string, ending with current date. Default is 2 years
        valid periods: "1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h",
                        "1d", "3d", "1w", "1M"

    - **start_str**:  optional 
      start date string in UTC format or timestamp in milliseconds

    - **end_str**:  optional 
      end date string in UTC format or timestamp in milliseconds

    Response JSON format:

"""
@app.get("/single-crypto/")
def get_crypto_data(symbol: str = 'BTCUSDT', interval: Optional[str] = "1d", start_str: Optional[str] = '2021.10.1', end_str: Optional[str] = '2021.11.1'):
    client=Client(api_key,api_secret)
    historical_data = client.get_historical_klines(symbol, interval, start_str, end_str)
    hist_df = pd.DataFrame(historical_data).iloc[:,:6]
    hist_df.columns = ['Open Time', 'Open', 'High', 'Low', 'Close', 'Volume']
    hist_df['Open Time'] = hist_df['Open Time']/1000
    # hist_df['Open Time'] = pd.to_datetime(hist_df['Open Time']/1000, unit='s')
    numeric_columns = ['Open', 'High', 'Low', 'Close', 'Volume']
    hist_df[numeric_columns] = hist_df[numeric_columns].apply(pd.to_numeric, axis=1)
    # hist_df = hist_df.set_index("Open Time")
    cryptoJSON = jsonpickle.encode(predictLSTM(hist_df))
    
    return cryptoJSON


"""
    Reads a stock info for specified time period to current day
    - **ticker**: required ticker name, for multiple tickers, seperate with whitespace in string -> "AAPL MSFT AMZN"

    - **period**: an optional time period in string, ending with current date. Default is 2 years
        valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max

"""
@app.get("/stocks")
def get_ticker_data(ticker: str, period: Optional[str] = "2y"):
    stocks = yf.download(
                tickers = ticker,
                period = period,
                interval = "1d",    # interval is fixed to 1 day
                group_by = "ticker"
            )
    return parse_df(stocks, ticker)

@app.get("/all-forex")
def get_forex_data(ticker: str = 'EURUSD=X JPY=X GBPUSD=X', period: Optional[str] = "2y", interval: Optional[str] = "1d"):
    forex = yf.download(
                period = period,
                interval = interval
            )
    print(forex)
    return parse_df_default(forex)


@app.get("/forex")
def get_forex_data(ticker: str, period: Optional[str] = "2y"):
    forex = yf.download(
                tickers = ticker,
                period = period,
                interval = "1d",    # interval is fixed to 1 day
                group_by = "ticker"
            )
    
    data_df = pd.DataFrame(forex)
    
    predict_res = predictARIMA(data_df)
    print(predict_res)
    return parse_df_default(data_df)