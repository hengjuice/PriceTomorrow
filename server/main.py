import yfinance as yf
from binance.client import Client
from typing import Optional, Union
import uvicorn

from fastapi import FastAPI
import json
import pandas as pd
import jsonpickle

from utility.timeSeries import getTimeSeries
from predictionModels.lstm import predictLSTM
from predictionModels.arima import predictARIMA
from predictionModels.randomforest import predictRF
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
@app.get("/all-crypto")
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
@app.get("/single-crypto")
def get_crypto_data(model: str, symbol: str = 'BTCUSDT', interval: Optional[str] = "1d", start_str: Optional[str] = '2020.10.1', end_str: Optional[str] = '2021.11.1'):
    print(f"SYMBOL {symbol} -------------- INTERVAL {interval}")
    print(f"START STR {start_str} --------- END STR {end_str}")
    
    client=Client(api_key,api_secret)
    historical_data = client.get_historical_klines(symbol, interval, start_str, end_str)
    data_df = pd.DataFrame(historical_data).iloc[:,:6]
    data_df.columns = ['Open Time', 'Open', 'High', 'Low', 'Close', 'Volume']
    # data_df['Open Time'] = data_df['Open Time']/1000
    data_df['Open Time'] = pd.to_datetime(data_df['Open Time']/1000, unit='s')
    numeric_columns = ['Open', 'High', 'Low', 'Close', 'Volume']
    data_df[numeric_columns] = data_df[numeric_columns].apply(pd.to_numeric, axis=1)
    data_df = data_df.set_index("Open Time")

    # WORK IN PROGRESS
    if model == "LSTM":
        return predictLSTM(data_df)
    elif model == "ARIMA":
        return predictARIMA(data_df)
    else:
        return predictRF(data_df)

    
    # return predictARIMA()


"""
    Reads a stock info for specified time period to current day
    - **ticker**: required ticker name, for multiple tickers, seperate with whitespace in string -> "AAPL MSFT AMZN"

    - **period**: an optional time period in string, ending with current date. Default is 2 years
        valid periods: 1d,5d,1mo,3mo,6mo,1y,2y,5y,10y,ytd,max

"""
@app.get("/stocks")
def get_ticker_data(model: str, ticker: str, period: Optional[str] = "2y"):
    stocks = yf.download(
                tickers = ticker,
                period = period,
                interval = "1d",   # interval is fixed to 1 day
                group_by = "ticker"
            )
    data_df = pd.DataFrame(stocks)

    # WORK IN PROGRESS
    if model == "LSTM":
        return predictLSTM(data_df)
    elif model == "ARIMA":
        return predictARIMA(data_df)
    elif model == "RANDOMFOREST":
        return predictRF(stocks)

@app.get("/all-forex")
def get_forex_data(ticker: str = 'EURUSD=X JPY=X GBPUSD=X', period: Optional[str] = "2y", interval: Optional[str] = "1d"):
    forex = yf.download(
                period = period,
                interval = interval
            )
    print(forex)
    return parse_df_default(forex)


@app.get("/forex")
def get_forex_data(model: str, ticker: str, period: Optional[str] = "2y"):
    forex = yf.download(
                tickers = ticker,
                period = period,
                interval = "1d",    # interval is fixed to 1 day
                group_by = "ticker"
            )
    
    data_df = pd.DataFrame(forex)


    # WORK IN PROGRESS
    if model == "LSTM":
        return predictLSTM(data_df)
    elif model == "ARIMA":
        return predictARIMA(data_df)
    elif model == "RANDOMFOREST":
        return predictRF(forex)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)