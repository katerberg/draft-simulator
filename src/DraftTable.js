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
    const pickDelay = pick > 18 ? 3000 : 30000;
    setIsPaused(false);
    setCurrentPickEnd(pickDelay + Date.now());
    setCurrentPickTimerId(setTimeout(() => {
      makePick(pick + 1)
      handlePlay(pick + 1);
    }, pickDelay));
  }, [makePick]);

  useEffect(() => {
    if (!currentPickTimerId && !isPaused) {
      makePick(startingPick);
      handlePlay(startingPick);
    }
  }, [makePick, handlePlay, isPaused, startingPick, currentPickTimerId, currentPickEnd])

  const handlePause = useCallback(() => {
    setIsPaused(true);
    clearTimeout(currentPickTimerId);
    setCurrentPickTimerId(null);
    setCurrentPickEnd(null);
  }, [currentPickTimerId]);

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
      <PickSelector pickNumber={currentPick} onPause={handlePause} isPaused={isPaused} onPlay={handlePlay}/>
    </>
  );
}

DraftTable.propTypes = {
  startingPick: PropTypes.number.isRequired,
  picks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string
  )).isRequired,
};
