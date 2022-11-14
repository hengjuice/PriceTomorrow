import json

class Forex():
    def __init__(self, predictedPrice: str, originalPrice: str, openingPrice: str, lastWeekPrice: str, testRMSE: str, originalTickerTimeSeries = None, predictedTickerTimeSeries = None) -> None:
        self.predictedPrice = predictedPrice
        self.originalPrice = originalPrice
        self.openingPrice = openingPrice
        self.lastWeekPrice = lastWeekPrice
        self.testRMSE = testRMSE
        self.originalTickerTimeSeries = originalTickerTimeSeries
        self.predictedTickerTimeSeries = predictedTickerTimeSeries

    def show(self) -> None:
        print(f"Predicted Price : {self.predictedPrice}")
        print(f"Original Price : {self.originalPrice}")
        print(f"Original Price : {self.openingPrice}")
        print(f"Original Price : {self.lastWeekPrice}")
        print(f"Test RMSE : {self.testRMSE}")
        print(f"Original ticker time series : {self.originalTickerTimeSeries}")
        print(f"Predicted ticker time series : {self.predictedTickerTimeSeries}")    