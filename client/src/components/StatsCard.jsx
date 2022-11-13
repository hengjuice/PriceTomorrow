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

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.model}
        </Typography>
        <Typography variant="h5" component="div">
          R{bull}M{bull}S{bull}E
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          Root Mean Square Error
        </Typography>
        <Typography variant="h6">
          {props.query?.data?.testRMSE}
          <br />
        </Typography>
        <Typography sx={{ mt: 2 }} variant="h5" component="div">
          Predicted Price
        </Typography>
        <Typography variant="h6">
          ${props.query?.data?.predictedPrice}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default BasicCard;