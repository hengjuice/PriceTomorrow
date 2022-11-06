import React, {useState} from 'react';
import { Grid, CircularProgress } from '@mui/material';
import PriceChart from './DataViz/PriceChart';
import MultiSelect from './MultiSelect';

const SharedLayout = (props) => {
	// const [ original, originalFetch ] = useState([]);
	// const [arima, arimaFetch] = useState([]);
	// const [lstm, lstmFetch] = useState([]);
	// const [linreg, linregFetch] = useState([]);

	// const [normal, normalFetch] = useState([]);
	const data = props.data;
	const getTicker = props.getTicker;
	const getPeriod = props.getPeriod;

	const [finishLoading, setFinishLoading] = useState(false);


	const chooseTicker = (param) => {
		getTicker(param);
		console.log("SharedLayout | ticker: ", param);
	};

	const choosePeriod = (param) => {
		getPeriod(param);
		console.log("sharedLayout | period: ", param);
	}

	return (
		<>
			{
				finishLoading?
				<div>
					<CircularProgress />
				</div>:
				<div>
					<MultiSelect chooseTicker={chooseTicker} choosePeriod={choosePeriod} />
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
				</div>
			}
		</>
	)
}

export default SharedLayout