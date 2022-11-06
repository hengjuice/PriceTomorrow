class Crypto():
    def __init__(self, predictedPrice: str, buySignal: str, trainRMSE: str, testRMSE: str) -> None:
        self.predictedPrice = predictedPrice
        self.buySignal = buySignal
        self.trainRMSE = trainRMSE
        self.testRMSE = testRMSE

    def show(self) -> None:
        print(f"Predicted Price : {self.predictedPrice}")
        print(f"Buy Signal : {self.buySignal}")
        print(f"Train RMSE : {self.trainRMSE}")
        print(f"Test RMSE : {self.testRMSE}")
