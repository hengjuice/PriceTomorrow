import pandas as pd
from numpy import asarray
from sklearn.metrics import mean_absolute_error
from sklearn.ensemble import RandomForestRegressor
from returnClasses.Forex import Forex



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
	error = mean_absolute_error(test[:, -1], predictions)
	return error, test[:, -1].tolist()[0], predictions[0]

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
    # print(data)
    df = pd.DataFrame(data) 
    # print(df)
    values=df['Close'].values
    # print(values)
    data=series_to_supervised(values,n_in=1)
    rmse, actual, pred = walk_forward_validation(data,1)

    res = Forex(
        predictedPrice=pred,
        testRMSE=str(rmse)
    )
    return res


