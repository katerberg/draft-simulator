import { useMemo, useState } from 'react';
import { getPicks, CSVToArray } from './CsvParser';
import DraftTable from './DraftTable';
import Uploader from './Uploader';

export default function App() {
  const [csv, setCsv] = useState();
  const [startingPick, setStartingPick] = useState(1);
  const handleCsvChange = (csv, pick) => {
    setStartingPick(pick);
    setCsv(CSVToArray(csv));
  }
  const picks = useMemo(()=> getPicks(csv), [csv]);

  return (
    <div>
      {!csv && <Uploader onCsvChange={handleCsvChange}/>}
      {csv && <DraftTable picks={picks} players={csv[0]} startingPick={startingPick} />}
    </div>
  );
}
