import json
import yfinance as yf
from binance.client import Client
from typing import Optional, Union

from fastapi import FastAPI, Response
import pandas as pd

api_key = "xUUAHD0zr0sZgbl6IVMkPNeiiDWUUZgg80tjT05iKXSWTtLkXjx5w7tpDsyjF281"
api_secret = "rWULkBSHUf5FLHPaBvrBX7hiHjz4nlVWDuud14QJZ94Bccse0ZlQh0IL91ouqHnH"
client=Client(api_key,api_secret)

app = FastAPI()

def parse_df(df):
    # print(df.columns)
    # if isinstance(df.index, pd.MultiIndex):

    #if single index
    res = df.to_json(orient="index", date_format='iso')
    parsed = json.loads(res)
    return parsed

@app.get("/")
def read_root():
    info = client.get_all_tickers()
    return {"Hello": info}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

"""
    Reads all crypto info

    Response JSON format:

"""
@app.get("/all-crypto/")
def get_all_crypto_data():
    data = client.get_all_tickers()
    data_df = pd.DataFrame(data)

    return parse_df(data_df)

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
    historical_data = client.get_historical_klines(symbol, interval, start_str, end_str)
    hist_df = pd.DataFrame(historical_data).iloc[:,:6]
    hist_df.columns = ['Open Time', 'Open', 'High', 'Low', 'Close', 'Volume']
    hist_df['Open Time'] = pd.to_datetime(hist_df['Open Time']/1000, unit='s')
    numeric_columns = ['Open', 'High', 'Low', 'Close', 'Volume']
    hist_df[numeric_columns] = hist_df[numeric_columns].apply(pd.to_numeric, axis=1)
    hist_df = hist_df.set_index("Open Time")

    return parse_df(hist_df)


"""
    Reads a stock info for specified time period to current day
    - **ticker**: required ticker name, for multiple tickers, seperate with whitespace in string -> "AAPL MSFT AMZN"

    - **period**: an optional time period in string, ending with current date. Default is 2 years
        valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max

    - **interval**: an optional interval in string. Default is 1 day
        valid intervals: 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo

    Response JSON format:

"""
@app.get("/stocks")
def get_ticker_data(ticker: str, period: Optional[str] = "2y", interval: Optional[str] = "1d"):
    stocks = yf.download(
                tickers = ticker,
                period = period,
                interval = interval
            )
    print(stocks)
    return parse_df(stocks)

