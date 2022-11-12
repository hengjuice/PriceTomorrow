import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Button, Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const time_periods = [
  {text: '1 Day', value: '1d'},
  {text: '5 Days', value: '5d'},
  {text: '1 Month', value: '1mo'},
  {text: '3 Months', value: '3mo'},
  {text: '6 Months', value: '6mo'},
  {text: '1 Year', value: '1y'},
  {text: '2 Years', value: '2y'},
  {text: '5 Years', value: '5y'},
  {text: '10 Years', value: '10y'}
]

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultiSelect = (props) => {
  
  const theme = useTheme();
  const [ticker, setTicker] = React.useState([]);
  const [period, setPeriod] = React.useState([]);

  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;
    setTicker(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handlePeriodSelect = (event) => {
    const {
      target: { value },
    } = event;
    setPeriod(value);
    console.log("MultiSelect Period: ", period);
  }

  const handleChange = () => {
    props.chooseTicker(ticker);
    props.choosePeriod(period);
  };

  return (
    <div>
      <Box sx={{display: 'flex'}}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-chip-label">Please Select Tickers</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={ticker}
            onChange={handleSelect}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {props.tickers.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, ticker, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="period-label">Please Select A Period</InputLabel>
          <Select
            labelId="select-period-label"
            id="period-label"
            value={period}
            label="Period"
            onChange={handlePeriodSelect}>
              {time_periods.map((time_period) => (
                <MenuItem
                  key={time_period.value}
                  value={time_period.value}
                >
                  {time_period.text}
              </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button onClick={handleChange}>
            Enter
          </Button>
      </Box>
    </div>
  );
}

export default MultiSelect
