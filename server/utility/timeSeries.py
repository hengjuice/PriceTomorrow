def getTimeSeries(df, timeColName, priceColName):
    res = [[x, y] for x, y in zip(df[timeColName], df[priceColName])]

    return res