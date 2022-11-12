def getTimeSeries(df, priceColName):
    res = [[x.timestamp(), y] for x, y in zip(df.index, df[priceColName])]

    return res