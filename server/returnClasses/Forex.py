import json

class Forex():
    def __init__(self, predictedPrice: str, originalTickerTimeSeries = None, predictedTickerTimeSeries = None) -> None:
        self.predictedPrice = predictedPrice
        self.originalTickerTimeSeries = json.dumps(originalTickerTimeSeries)
        self.predictedTickerTimeSeries = json.dumps(predictedTickerTimeSeries)

    def show(self) -> None:
        print(f"Predicted Price : {self.predictedPrice}")
        print(f"Original ticker time series : {self.originalTickerTimeSeries}")
        print(f"Predicted ticker time series : {self.predictedTickerTimeSeries}")
        
    def toJSON(self, predictedPrice: str, originalTickerTimeSeries = None, predictedTickerTimeSeries = None):
        self.predictedPrice = json.dumps(predictedPrice)
        self.originalTickerTimeSeries = json.dumps(originalTickerTimeSeries)
        self.predictedTickerTimeSeries = json.dumps(predictedTickerTimeSeries)        