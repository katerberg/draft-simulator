import { useState } from 'react';
import { CSVToArray } from './CsvParser';
import Uploader from './Uploader';

function App() {
  const [csvText, setCsvText] = useState();
  const handleCsvChange = (csv) => {
    setCsvText(csv)
    console.log(CSVToArray(csv))
  }

  return (
    <div>
      {!csvText && <Uploader onCsvChange={handleCsvChange}/>}
      {csvText}
    </div>
  );
}

export default App;
