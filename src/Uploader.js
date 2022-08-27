import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Grid, Link, TextField, Typography } from '@mui/material';

const Input = styled('input')({
  display: 'none',
});

const StartingPickInput = styled(TextField)(({theme}) => ({
  marginBottom: theme.spacing(4),
  '& .MuiInputBase-input': {
    color: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
  },
  '& label': {
    color: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    },
  },
}));

export default function Uploader({onCsvChange}) {
  const [csvFile, setCsvFile] = useState();
  const [startingPick, setStartingPick] = useState(1);

  useEffect(() => {
    if (!csvFile) {
      return;
    }
    const reader = new FileReader();

    reader.onload = function(e) {
      onCsvChange(e.target.result, startingPick)
    }

    reader.readAsText(csvFile);
  }, [csvFile, onCsvChange, startingPick])

  const handleStartingPickChange = (e) => {
    let val = Number.parseInt(e.target.value || 1);
    if (val > 368) {
      val = 368;
    }
    if (val < 1) {
      val = 1;
    }

    setStartingPick(val || startingPick);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Typography mb={3} variant='h1'>Upload your draft</Typography>
        <Typography sx={{color: 'rgb(144, 202, 249)'}}>
          <Link target="_blank" rel="noreferrer" color="inherit" href='https://docs.google.com/spreadsheets/d/1AdrhWkDX7i9p2rZbEKzDs3nQAhCvcH0LAXZQNwWMsnA/edit#gid=945529176'>
            Link to valid drafts
          </Link>
        </Typography>
        <Typography variant="subtitle2" mb={5}>
            (download as csv)
        </Typography>
        <label htmlFor="button-file">
          <Input 
              type='file'
              accept='.csv'
              onChange={(e) => {
                  setCsvFile(e.target.files[0])
              }}
              id="button-file"
          />
          <Grid>
            <StartingPickInput
              variant="filled"
              label="Start with pick"
              type="number"
              value={startingPick}
              onChange={handleStartingPickChange}
              inputProps={{
                step: 1,
                min: 1,
                max: 46,
                type: 'number',
              }}
            />
          </Grid>
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      </header>
    </div>
  );
}
