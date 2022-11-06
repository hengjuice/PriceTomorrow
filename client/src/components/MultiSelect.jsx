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

const names = [
  'AAPL',
  'MSFT',
  'BTC',
  'USD/EUR',
];

const periods = [
  '1d',
  '5d',
  '1mo',
  '3mo',
  '6mo',
  '1y',
  '2y',
  '5y',
  '10y',
  'ytd',
  'max'
]

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultiSelect = ({ chooseTicker }) => {
  const theme = useTheme();
  const [ticker, setTicker] = React.useState([]);

  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;
    setTicker(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log("MultiSelect: ", value);
  };

  const handleChange = () => {
    chooseTicker(ticker);
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
            {names.map((name) => (
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
        <Button onClick={handleChange}>
            Enter
          </Button>
      </Box>
    </div>
  );
}

export default MultiSelect
