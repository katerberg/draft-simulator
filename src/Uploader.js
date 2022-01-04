import './App.css';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

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
