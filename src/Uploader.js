import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';

const Input = styled('input')({
  display: 'none',
});

export default function Uploader({onCsvChange}) {
  const [csvFile, setCsvFile] = useState();
  useEffect(() => {
    if (!csvFile) {
      return;
    }
    const reader = new FileReader();

    reader.onload = function(e) {
      onCsvChange(e.target.result)
    }

    reader.readAsText(csvFile);
  }, [csvFile, onCsvChange])
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
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      </header>
    </div>
  );
}
