from statsmodels.tsa.arima.model import ARIMA
# from sklearn.metrics import MeanSquaredError
from matplotlib import pyplot
import time
import datetime

def predictARIMA(df):
    def StartARIMAForecasting(Actual, P, D, Q):
        model = ARIMA(Actual, order=(P, D, Q))
        model_fit = model.fit()
        prediction = model_fit.forecast()[0]
        return prediction

    
    actual_data=df['Close']
    month=actual_data.index.to_pydatetime()
    # month=month.timestamp()
    num_data=len(df)
    print(actual_data)
    TrainingSize = int(num_data * 0.7)
    TrainingData = actual_data[0:TrainingSize]
    TestData = actual_data[TrainingSize:num_data]

    Actual = [x for x in TrainingData]
    Predictions = list()
    Timepoints=list()

    for timepoint in range(len(TestData)):
        ActualValue =  TestData[timepoint]
        #forcast value
        Timepoint = month[timepoint+TrainingSize]
        Prediction = StartARIMAForecasting(Actual, 3,1,0)    
        print('Actual=%f, Predicted=%f' % (ActualValue, Prediction))
        #add it in the list
        Predictions.append(Prediction)
        Actual.append(ActualValue)
        Timepoints.append(Timepoint)

    # Error = MeanSquaredError(TestData, Predictions)
    # print('Test Mean Squared Error (smaller the better fit): %.3f' % Error)
    # plot
    # pyplot.plot(TestData)
    # pyplot.plot(Predictions, color='red')
    # res=pyplot.show()

    return (Predictions, Actual, Timepoints)
