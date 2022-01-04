import { useMemo, useState } from 'react';
import { getPicks, CSVToArray } from './CsvParser';
import DraftTable from './DraftTable';
import Uploader from './Uploader';

export default function App() {
  const [csv, setCsv] = useState();
  const handleCsvChange = (csv) => {
    setCsv(CSVToArray(csv))
  }
  const picks = useMemo(()=> getPicks(csv), [csv]);

  return (
    <div>
      {!csv && <Uploader onCsvChange={handleCsvChange}/>}
      {csv && <DraftTable picks={picks} players={csv[0]} />}
    </div>
  );
}
