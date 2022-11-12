from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from keras.models import Sequential
from keras.layers import Dense, LSTM, Activation, Dropout
from keras.metrics import MeanAbsoluteError
import numpy as np
import pandas as pd
import math
from returnClasses.Crypto import Crypto
from utility.timeSeries import getTimeSeries

import json

def parse_df_default(df):
    res = df.to_json(orient="index")
    parsed = json.loads(res)
    return parsed     

def predictLSTM(df):
    df_close = df['Close']

    df_close_log = df_close.apply(np.log)
    df_close_tf = df_close_log.apply(np.sqrt)

    df_close_shift = df_close_tf - df_close_tf.shift()
    df_close_shift.dropna(inplace=True)

    def preprocess_lstm(sequence, n_steps,n_features):
        X, y = list(), list()
        for i in range(len(sequence)):
            # find the end of this pattern
            end_ix = i + n_steps
            # check if we are beyond the sequence
            if end_ix >= len(sequence):
                break
            # gather input and output parts of the pattern
            seq_x, seq_y = sequence[i:end_ix], sequence[end_ix]
            X.append(seq_x)
            y.append(seq_y)
            
        X = np.array(X)
        y = np.array(y)

        X = X.reshape((X.shape[0], X.shape[1], n_features))
        return X, y

    # choose the number of days on which to base our predictions 
    nb_days = 30

    n_features = 1

    X, y = preprocess_lstm(df_close_shift.to_numpy(), nb_days, n_features)

    #Split the data set between the training set and the test set
    test_days = int(len(df) * 0.3)

    X_train, y_train = X[:-test_days], y[:-test_days]
    X_test, y_test = X[-test_days:], y[-test_days:]

    train_original = df_close.iloc[:len(X_train)]
    test_original = df_close.iloc[-test_days:]

    def vanilla_LSTM():
        model = Sequential()    
        model.add(LSTM(units=50, input_shape=(nb_days, n_features)))
        model.add(Dense(1))
        return model

    model = vanilla_LSTM()
    model.summary()
    model.compile(optimizer='adam', 
                loss='mean_squared_error',
                metrics=[MeanAbsoluteError()])

    model.fit(X_train, 
          y_train, 
          epochs=2, 
          batch_size = 32)

    results = model.evaluate(X_test, y_test, batch_size=32)

    # Prediction
    y_train_pred = model.predict(X_train)
    train_pred_data = pd.DataFrame(y_train_pred[:,0], train_original.index,columns=['Close'])
    train_pred_data['Close'] = train_pred_data['Close'] + df_close_tf.shift().values[:len(X_train)]

    train_pred_data = train_pred_data.apply(np.square)
    train_pred_data = train_pred_data.apply(np.exp)

    train_pred_data = train_pred_data.fillna(0)

    originalTickerTimeSeries = getTimeSeries(train_pred_data, 'Close')

    # Prediction
    y_test_pred = model.predict(X_test)
    test_pred_data = pd.DataFrame(y_test_pred[:,0], test_original.index,columns=['Close'])
    test_pred_data['Close'] = test_pred_data['Close'] + df_close_tf.shift().values[-test_days:]

    test_pred_data = test_pred_data.apply(np.square)
    test_pred_data = test_pred_data.apply(np.exp)

    predictedTickerTimeSeries = getTimeSeries(test_pred_data, 'Close')

    trainScore = math.sqrt(model.evaluate(X_train, y_train, batch_size=32)[0])
    testScore = math.sqrt(model.evaluate(X_test, y_test, batch_size=32)[0])
    
    res = Crypto(
        str(predictedTickerTimeSeries[-1][1]),
        str(trainScore),
        str(testScore),
        originalTickerTimeSeries,
        predictedTickerTimeSeries
    )
    res.show()
    return res