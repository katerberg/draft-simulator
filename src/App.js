import { useState } from 'react';
import { CSVToArray } from './CsvParser';
import Uploader from './Uploader';

function App() {
  const [csv, setCsv] = useState();
  const handleCsvChange = (csv) => {
    setCsv(CSVToArray(csv))
  }
  const players = csv ? csv[0]: null;
  console.log(csv);

  return (
    <div>
      {!csv&& <Uploader onCsvChange={handleCsvChange}/>}
      {csv && <div>
        {players.map(player => <div key={player}>{player}</div>)}
      </div>}
    </div>
  );
}

export default App;
