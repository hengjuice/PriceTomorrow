import json

class Forex():
    def __init__(self, predictedPrice: str, testRMSE: str, originalTickerTimeSeries = None, predictedTickerTimeSeries = None) -> None:
        self.predictedPrice = predictedPrice
        self.testRMSE = testRMSE
        self.originalTickerTimeSeries = originalTickerTimeSeries
        self.predictedTickerTimeSeries = predictedTickerTimeSeries

    def show(self) -> None:
        print(f"Predicted Price : {self.predictedPrice}")
        print(f"Test RMSE : {self.testRMSE}")
        print(f"Original ticker time series : {self.originalTickerTimeSeries}")
        print(f"Predicted ticker time series : {self.predictedTickerTimeSeries}")    