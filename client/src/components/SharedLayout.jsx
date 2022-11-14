import React, {useState} from 'react';
import { Grid, CircularProgress, Card, CardContent, Typography } from '@mui/material';
import PriceChart from './DataViz/PriceChart';
import MultiSelect from './MultiSelect';
import StatsCard from './StatsCard'
import { Content } from 'antd/lib/layout/layout';

const SharedLayout = (props) => {
	const [finishLoading, setFinishLoading] = useState(false);

	var increase = false;
	if (props.arima?.data?.originalPrice > props.arima?.data?.openingPrice) {
		increase = true;
	}

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
					{
						props.arima?.data?.openingPrice > 0 ? 
							<Grid container spacing = {4} sx={{px: 1}}>
								<Grid item xs = {3}>
									<Card>
										<CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', bgcolor: '#3462FF'}}>
											<Typography variant="h5" sx={{color: '#edeeec', fontWeight: 500, mb: 0.5}}>
												${props.arima?.data?.openingPrice}
											</Typography>
											<Typography sx={{ fontSize: 14, color: '#edeeec' }} gutterBottom>
												OPEN
											</Typography>
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs = {3}>
									<Card>
										<CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', bgcolor: '#DCB400'}}>
											<Typography variant="h5" sx={{color: '#edeeec', fontWeight: 500, mb: 0.5}}>
												${props.arima?.data?.originalPrice}
											</Typography>
											<Typography sx={{ fontSize: 14, color: '#edeeec' }} gutterBottom>
												CLOSE
											</Typography>
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs = {3}>
									<Card>
										<CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', bgcolor: increase ? '#00C100' : '#E10000'}}>
											<Typography variant="h5" sx={{color: '#edeeec', fontWeight: 500, mb: 0.5}}>
												{((props.arima?.data?.originalPrice - props.arima?.data?.openingPrice) / props.arima?.data?.openingPrice * 100).toFixed(3)}%
											</Typography>
											<Typography sx={{ fontSize: 14, color: '#edeeec' }} gutterBottom>
												DAILY PERCENTAGE CHANGE
											</Typography>
										</CardContent>
									</Card>
								</Grid>
								<Grid item xs = {3}>
									<Card>
										<CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', bgcolor: increase ? '#00C100' : '#E10000'}}>
											<Typography variant="h5" sx={{color: '#edeeec', fontWeight: 500, mb: 0.5}}>
												{((props.arima?.data?.originalPrice - props.arima?.data?.lastWeekPrice) / props.arima?.data?.lastWeekPrice * 100).toFixed(3)}%
											</Typography>
											<Typography sx={{ fontSize: 14, color: '#edeeec' }} gutterBottom>
												WEEKLY PERCENTAGE CHANGE
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							</Grid> :
						<></>
					}
					<br />
					<Grid container spacing = {2}>

						<Grid item xs = {6}>
							<h1>Price Trend</h1>
							<PriceChart 
								title = {"Price Trend"}
								original = {props.arima?.data?.originalTickerTimeSeries}
								isLoading = {props.arima?.isLoading}
							/>
						</Grid>

						<Grid item xs = {6}>
							<h1>ARIMA</h1>
							<PriceChart
								title = {"ARIMA"}
								predicted = {props.arima?.data?.predictedTickerTimeSeries}
								original = {props.arima?.data?.originalTickerTimeSeries}
								isLoading = {props.arima?.isLoading}
							/>
						</Grid>

						<Grid item xs = {6}>
							<h1>Long Short Term Memory</h1>
							<PriceChart
								title = {"LSTM"}
								predicted = {props.lstm?.data?.predictedTickerTimeSeries}
								original = {props.arima?.data?.originalTickerTimeSeries}
								isLoading = {props.lstm?.isLoading}
							/>
						</Grid>

						<Grid item xs = {6}>
							<h1>Random Forest</h1>
							<PriceChart
								title = {"Random Forest"}
								predicted = {props.rf?.data?.predictedTickerTimeSeries}
								original = {props.rf?.data?.originalTickerTimeSeries}
								isLoading = {props.rf?.isLoading}
							/>
						</Grid>

					</Grid>
					<br />

					{
						props.arima?.data?.openingPrice > 0 ? 
							<Grid container spacing = {10}>
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
										model = {'Random Forest'}
										query = {props.rf}
									/>
								</Grid>
							</Grid> :
							<></>
					}
				</div>
			}
		</>
	)
}

export default SharedLayout