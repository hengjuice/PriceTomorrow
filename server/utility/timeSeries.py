def getTimeSeries(df):
    res = [[x, y] for x, y in zip(df['Open Time'], df['Close'])]

    return res