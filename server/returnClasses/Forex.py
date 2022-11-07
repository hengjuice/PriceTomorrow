import json

class Forex():
    def __init__(self, predictedPrice: str, originalTickerTimeSeries = None, predictedTickerTimeSeries = None) -> None:
        self.predictedPrice = predictedPrice
        self.originalTickerTimeSeries = originalTickerTimeSeries
        self.predictedTickerTimeSeries = predictedTickerTimeSeries

    def show(self) -> None:
        print(f"Predicted Price : {self.predictedPrice}")
        print(f"Original ticker time series : {self.originalTickerTimeSeries}")
        print(f"Predicted ticker time series : {self.predictedTickerTimeSeries}")    