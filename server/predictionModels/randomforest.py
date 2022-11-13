import pandas as pd
from numpy import asarray
from sklearn.metrics import mean_absolute_error
from sklearn.ensemble import RandomForestRegressor
from returnClasses.Forex import Forex
import math



def series_to_supervised(data, n_in=1, n_out=1, dropnan=True):
    # n_vars = 1 if type(data) is list else data.shape[1]
    df = pd.DataFrame(data)  
    cols = list()
	# input sequence (t-n, ... t-1)
    for i in range(n_in, 0, -1):
        cols.append(df.shift(i))
    
	# forecast sequence (t, t+1, ... t+n)
    for i in range(0, n_out):
        cols.append(df.shift(-i))
	# put it all together
    agg = pd.concat(cols, axis=1)
	# drop rows with NaN values
    if dropnan:
        agg.dropna(inplace=True)
    return agg.values

def walk_forward_validation(data, n_test):
    predictions = list()
    # split dataset
    train, test = train_test_split(data, n_test)
    # seed history with training dataset
    history = [x for x in train]
    # step over each time-step in the test set
    for i in range(len(test)):
        # split test row into input and output columns
        testX, testy = test[i, :-1], test[i, -1]
        # fit model on history and make a prediction
        yhat = random_forest_forecast(history, testX)
        # store forecast in list of predictions
        predictions.append(yhat)
        # add actual observation to history for the next loop
        history.append(test[i])
        # summarize progress
        print('>expected=%.1f, predicted=%.1f' % (testy, yhat))
    # estimate prediction error
    error = math.sqrt(mean_absolute_error(test[:, -1], predictions))
    return error, test[:, -1].tolist()[0], predictions

def train_test_split(data, n_test):
	return data[:-n_test, :], data[-n_test:, :]

def random_forest_forecast(train, testX):
	# transform list into array
	train = asarray(train)
	# split into input and output columns
	trainX, trainy = train[:, :-1], train[:, -1]
	# fit model
	model = RandomForestRegressor(n_estimators=1000)
	model.fit(trainX, trainy)
	# make a one-step prediction
	yhat = model.predict([testX])
	return yhat[0]

def predictRF(data):
    df = pd.DataFrame(data) 

    month=df.index.tolist()
    for i in range(len(month)):
        month[i]=month[i].timestamp()
    # month[-1]=month[-2]+86400
    months=month[-7:]
    actual_res=[0]*7
    pred_res=[0]*7


    values=df['Close'].values
    # print(values)
    actuals=values[-7:]
    data=series_to_supervised(values,n_in=7)
    rmse, actual, pred = walk_forward_validation(data,7)

    train = series_to_supervised(values, n_in=7)
    # split into input and output columns
    trainX, trainy = train[:, :-1], train[:, -1]
    # fit model
    model = RandomForestRegressor(n_estimators=1000)
    model.fit(trainX, trainy)
    # construct an input for a new prediction
    row = values[-7:].flatten()
    # make a one-step prediction
    yhat = model.predict(asarray([row]))
    print(f"Y HAT - - - - - - - {yhat}")
    print('Input: %s, Predicted: %.3f' % (row, yhat[0]))
    
    for i in range(7):
        pred_res[i]= [months[i],pred[i]]
        actual_res[i]= [months[i],actuals[i]]
    res = Forex(
        predictedPrice=yhat[0],
        testRMSE=str(rmse)
    )

    pred_res.append([month[-1]+86400, yhat[0]])

    res = Forex(
        predictedPrice=yhat[0],
        testRMSE=str(round(rmse, 3)),
        originalTickerTimeSeries=actual_res,
        predictedTickerTimeSeries=pred_res,
    )
    res.show()

    return res


