import './App.css';
import { useEffect, useState } from 'react';

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
        <input
            type='file'
            accept='.csv'
            id='csvFile'
            onChange={(e) => {
                setCsvFile(e.target.files[0])
            }}
        />
      </header>
    </div>
  );
}
