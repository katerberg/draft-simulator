import { useState } from 'react';
import { getPicks, CSVToArray } from './CsvParser';
import DraftTable from './DraftTable';
import Uploader from './Uploader';

export default function App() {
  const [csv, setCsv] = useState();
  const handleCsvChange = (csv) => {
    setCsv(CSVToArray(csv))
  }
  if(csv) {
    console.log(csv);
    console.log(getPicks(csv));
  }

  return (
    <div>
      {!csv && <Uploader onCsvChange={handleCsvChange}/>}
      {csv && <DraftTable players={csv[0]} />}
    </div>
  );
}
