import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const BasicCard = (props) => {

  var buy = false;
  if (props.query?.data?.predictedPrice > props.query?.data?.originalPrice) {
    buy = true;
  }
  
  return (
    <>
      <Card>
        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', bgcolor: buy ? '#00C100' : '#E10000'}}>
          <Typography variant="h5" sx={{color: '#edeeec', fontWeight: 500}}>
            ${props.query?.data?.predictedPrice}
          </Typography>
          <Typography sx={{ fontSize: 16, mt: 1, color: '#edeeec' }} component="div">
            Today's Predicted Closing Price by
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#edeeec' }} gutterBottom>
            {props.model}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 225, mt: 4 }}>
        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', bgcolor: '#3462FF'}}>
          <Typography sx={{ fontSize: 14, color: '#edeeec' }} gutterBottom>
            {props.model}
          </Typography>
          <Typography sx={{color: '#edeeec'}} variant="h5" component="div">
            R{bull}M{bull}S{bull}E
          </Typography>
          <Typography sx={{ mb: 1, color: '#edeeec' }}>
            Root Mean Square Error
          </Typography>
          <Typography variant="h6" sx={{color: '#edeeec'}}>
            {props.query?.data?.testRMSE}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default BasicCard;