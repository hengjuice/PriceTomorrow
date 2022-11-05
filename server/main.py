import json
import yfinance as yf

from typing import Optional, Union

from fastapi import FastAPI, Response
import pandas as pd

app = FastAPI()

def parse_df(df):
    # print(df.columns)
    # if isinstance(df.index, pd.MultiIndex):

    #if single index
    res = df.to_json(orient="index")
    parsed = json.loads(res)
    return parsed

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/tickers/{ticker}")
def get_ticker_data(ticker: str):
    stock = yf.Ticker(ticker)
    return {"info": stock.info}

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

