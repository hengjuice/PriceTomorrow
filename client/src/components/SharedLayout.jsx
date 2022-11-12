import React, {useState} from 'react';
import { Grid, CircularProgress } from '@mui/material';
import PriceChart from './DataViz/PriceChart';
import MultiSelect from './MultiSelect';
import StatsCard from './StatsCard'

const SharedLayout = (props) => {
	// const [ original, originalFetch ] = useState([]);
	// const [arima, arimaFetch] = useState([]);
	// const [lstm, lstmFetch] = useState([]);
	// const [linreg, linregFetch] = useState([]);

	// const [normal, normalFetch] = useState([]);
	const data = props.data;

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
								data = {data}
								finishLoading = {true}
								title = {'Price Trend'}
							/>
						</Grid>

						<Grid item xs = {6}>
							<h1>ARIMA</h1>
							<PriceChart />
						</Grid>

						<Grid item xs = {6}>
							<h1>LSTM</h1>
							<PriceChart />
						</Grid>

						<Grid item xs = {6}>
							<h1>Linear Regression</h1>
							<PriceChart />
						</Grid>

					</Grid>
					<br />
					<Grid container spacing = {2}>
						<Grid item xs = {3}>
							<StatsCard 
								model = {'ARIMA'}
							/>
						</Grid>
						<Grid item xs = {3}>
							<StatsCard 
								model = {'LSTM'}
							/>
						</Grid>
						<Grid item xs = {3}>
							<StatsCard 
								model = {'Linear Regression'}
							/>
						</Grid>
						<Grid item xs = {3}>
							<StatsCard 
								model = {'NULL'}
							/>
						</Grid>
					</Grid>
				</div>
			}
		</>
	)
}

export default SharedLayout