from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from keras.models import Sequential
from keras.layers import Dense, LSTM, Activation
import numpy as np
import math
from returnClasses.Crypto import Crypto
from utility.timeSeries import getTimeSeries

import json

def parse_df_default(df):
    res = df.to_json(orient="index")
    parsed = json.loads(res)
    return parsed     

def predictLSTM(df):
    ClosePrice = df['Close']

    ClosePrice = np.reshape(ClosePrice.values, (len(ClosePrice),1)) 
    scaler = MinMaxScaler(feature_range=(0, 1))
    ClosePrice = scaler.fit_transform(ClosePrice)

    # Splitting Training and Testing data
    train_Data = int(len(ClosePrice) * 0.75) #75% data as train and 25% as test
    test_Data = len(ClosePrice) - train_Data
    train_Data, test_Data = ClosePrice[0:train_Data,:],ClosePrice[train_Data:len(ClosePrice),:]

    def new_dataset(dataset):
        data_X, data_Y = [], []
        for i in range(len(dataset)-2):
            a = dataset[i:(i+1), 0]
            data_X.append(a)
            data_Y.append(dataset[i+1, 0])
        return np.array(data_X), np.array(data_Y)

    trainX, trainY = new_dataset(train_Data)
    testX, testY = new_dataset(test_Data)

    # ANN model
    model = Sequential()
    model.add(LSTM(32, input_shape=(1, 1), return_sequences = True))
    model.add(LSTM(16))
    model.add(Dense(1))
    model.add(Activation('linear'))

    # Fitting model
    model.compile(loss='mean_squared_error', optimizer='adagrad',metrics=['mse']) 
    history=model.fit(trainX, trainY, epochs=2, batch_size=1, verbose=2)

    # Predicting 
    trainPredict = model.predict(trainX).tolist() #Training data
    testPredict = model.predict(testX).tolist() #Testing data

    finalPredictList = [np.nan] * len(df)
    toBeAdded = [pred[0] for pred in trainPredict]
    finalPredictList[1:len(trainPredict)+1] = toBeAdded

    toBeAdded = [pred[0] for pred in testPredict]
    finalPredictList[len(trainPredict)+3:len(df)-1] = toBeAdded

    df["Predicted Close"] = finalPredictList
    # Add predictions to closing value
    for i, row in df.iterrows():
        row["Predicted Close"] += row["Close"]

    originalTickerTimeSeries = getTimeSeries(df, 'Open Time', 'Close')
    predictedTickerTimeSeries = getTimeSeries(df, 'Open Time', 'Predicted Close')

    trainPredict = scaler.inverse_transform(trainPredict)
    trainY = scaler.inverse_transform([trainY])
    testPredict = scaler.inverse_transform(testPredict)
    testY = scaler.inverse_transform([testY])

    # Price for next day
    last_val = testPredict[-1]
    next_val = model.predict(np.reshape(last_val, (1,1,1)))
    if np.ndarray.item(last_val)<np.ndarray.item(last_val+next_val):
        buySignal = "BUY"
    else:
        buySignal = "DON'T BUY"

    trainScore = math.sqrt(mean_squared_error(trainY[0], trainPredict[:,0]))
    testScore = math.sqrt(mean_squared_error(testY[0], testPredict[:,0]))

    res = Crypto(
        str(np.ndarray.item(last_val+next_val)),
        buySignal,
        str(trainScore),
        str(testScore),
        originalTickerTimeSeries,
        predictedTickerTimeSeries
    )
    res.show()
    return res  