from statsmodels.tsa.arima.model import ARIMA
# from sklearn.metrics import MeanSquaredError
from matplotlib import pyplot
import time
import datetime
from returnClasses.Forex import Forex
import json

def predictARIMA(df):
    def StartARIMAForecasting(Actual, P, D, Q):
        model = ARIMA(Actual, order=(P, D, Q))
        model_fit = model.fit()
        prediction = model_fit.forecast()[0]
        return prediction

    
    actual_data=df['Close']
    # actual_data=df
    # actual_data.loc[len(actual_data)] = 0

    num_data=len(df)
    month=actual_data.index.tolist()
    for i in range(len(month)-1):
        month[i]=month[i].timestamp()
    month[-1]=month[-2]+86400
    # actual_data.index=month
    # actual_data=actual_data['Close']

    TrainingSize = int(num_data * 0.7)
    TrainingData = actual_data[0:TrainingSize]
    TestData = actual_data[TrainingSize:num_data]
    Actual = [x for x in TrainingData]
    Predictions = list()
    Timepoints=list()
    pred_res=list()
    actual_res=list()


    for timepoint in range(len(TestData)):
        ActualValue =  TestData[timepoint]
        #forcast value
        Timepoint = month[timepoint+TrainingSize]
        Prediction = StartARIMAForecasting(Actual, 3,1,0)    
        # print('Timepoint=%f, Actual=%f, Predicted=%f' % (Timepoint, ActualValue, Prediction))
        #add it in the list
        Predictions.append(Prediction)
        Actual.append(ActualValue)
        Timepoints.append(Timepoint)
        pred_res.append([Timepoint, Prediction])
        actual_res.append([Timepoint, ActualValue])

    # Error = MeanSquaredError(TestData, Predictions)
    # print('Test Mean Squared Error (smaller the better fit): %.3f' % Error)
    # plot
    # pyplot.plot(TestData)
    # pyplot.plot(Predictions, color='red')
    # res=pyplot.show()

    pred_val=StartARIMAForecasting(TestData[len(TestData)-10:],1,1,0)
    pred_res.append([Timepoints[-1]+86400, pred_val])

    print(pred_val)


    res = Forex(
        pred_val,
        actual_res,
        pred_res,
    )
    res.show()

    return res
