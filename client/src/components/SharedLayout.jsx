import React, {useState} from 'react';
import { Grid, CircularProgress } from '@mui/material';
import PriceChart from './DataViz/PriceChart';
import MultiSelect from './MultiSelect';
import StatsCard from './StatsCard'

const SharedLayout = (props) => {
	const [finishLoading, setFinishLoading] = useState(false);

	return (
		<>
			{
				finishLoading?
				<div>
					<CircularProgress />
				</div>:
				<div>
					<MultiSelect
						tickers={props.tickers}
						chooseTicker={props.getTicker}
						choosePeriod={props.getPeriod}
					/>
					<Grid container spacing = {2}>

						<Grid item xs = {6}>
							<h1>Price Trend</h1>
							<PriceChart 
								title = {"Price Trend"}
								query = {props.arima}
							/>
						</Grid>

						<Grid item xs = {6}>
							<h1>ARIMA</h1>
							<PriceChart
								title = {"ARIMA"}
								query = {props.arima}
							/>
						</Grid>

						<Grid item xs = {6}>
							<h1>Long Short Term Memory</h1>
							<PriceChart
								title = {"LSTM"}
								query = {props.lstm}
							/>
						</Grid>

						<Grid item xs = {6}>
							<h1>Random Forest</h1>
							<PriceChart
								title = {"Random Forest"}
								query = {props.rf}
							/>
						</Grid>

					</Grid>
					<br />
					<Grid container spacing = {2}>
						<Grid item xs = {4}>
							<StatsCard 
								model = {'ARIMA'}
								query = {props.arima}
							/>
						</Grid>
						<Grid item xs = {4}>
							<StatsCard 
								model = {'LSTM'}
								query = {props.lstm}
							/>
						</Grid>
						<Grid item xs = {4}>
							<StatsCard 
								model = {'Linear Regression'}
								query = {props.rf}
							/>
						</Grid>
					</Grid>
				</div>
			}
		</>
	)
}

export default SharedLayout