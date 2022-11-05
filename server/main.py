import yfinance as yf

from typing import Optional, Union

from fastapi import FastAPI
import pandas as pd

app = FastAPI()

def nest(d: dict) -> dict:
    result = {}
    for key, value in d.items():
        target = result
        for k in key[:-1]:  # traverse all keys but the last
            target = target.setdefault(k, {})
        target[key[-1]] = value
    return result

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

