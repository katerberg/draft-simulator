import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCallback, useEffect, useState } from 'react';
import PickSelector from './PickSelector';

export default function DraftTable({players, picks, startingPick}) {
  const [currentPickTimerId, setCurrentPickTimerId] = useState(null);
  const [currentPickEnd, setCurrentPickEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPick, setCurrentPick] = useState(startingPick);
  const [visibleCards, setVisibleCards] = useState(picks.map(row => row.map(cell => '')));


  const makePick = useCallback((pickNumber) => {
    console.log('picking')
    setVisibleCards(picks.map((row, rowI) => row.map((cell, cellI) => {
      const cellNumber = rowI % 2 === 0 ? cellI + 1 : row.length - cellI;
      if (rowI * row.length + cellNumber <= pickNumber) {
        return picks[rowI][cellI];
      }
      return '';
    })));
    setCurrentPick(pickNumber);
  }, [picks]);

  const handlePlay = useCallback((pick) => {
    console.log('playing')
    const pickDelay = pick > 8 ? 10000 : 1000;
    setIsPaused(false);
    setCurrentPickEnd(pickDelay + Date.now());
    setCurrentPickTimerId(setTimeout(() => {
      makePick(pick + 1)
      handlePlay(pick + 1);
    }, pickDelay));
  }, [makePick]);

  useEffect(() => {
    if (!currentPickTimerId && !isPaused) {
      console.log('starting')
      makePick(startingPick);
      handlePlay(startingPick);
    }
  }, [makePick, handlePlay, isPaused, startingPick, currentPickTimerId, currentPickEnd])

  const handlePause = useCallback(() => {
    console.log('pausing')
    setIsPaused(true);
    clearTimeout(currentPickTimerId);
    setCurrentPickTimerId(null);
    setCurrentPickEnd(null);
  }, [currentPickTimerId]);

  const handleSkip = useCallback(()=>{
    console.log('skipping')
    handlePause();
    makePick(currentPick + 1);
    handlePlay(currentPick + 1);
  }, [currentPick, handlePause, handlePlay, makePick]);

  return (
    <>
      <Table stickyHeader sx={{maxHeight: '440px', marginBottom: 30}} aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell
              key="pick-number"
            >
              Pick
            </TableCell>
            {players.map((player) => (
              <TableCell
                key={player}
              >
                {player}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleCards
            .map((row, i) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                <TableCell key={`pick-number${i}`}>
                    {i+1}
                </TableCell>
                {row.map((pick, j) => (
                  <TableCell key={pick + j}>
                      {pick}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <PickSelector pickNumber={currentPick} onPause={handlePause} isPaused={isPaused} onPlay={handlePlay} onSkip={handleSkip}/>
    </>
  );
}

DraftTable.propTypes = {
  startingPick: PropTypes.number.isRequired,
  picks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string
  )).isRequired,
};
