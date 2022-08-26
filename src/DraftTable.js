import Table from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useCallback, useEffect, useState } from 'react';

export default function DraftTable({players, picks, startingPick}) {
  const [currentPickTimer, setCurrentPickTimer] = useState(null);
  const [visibleCards, setVisibleCards] = useState(picks.map(row => row.map(cell => '')));

  const makePick = useCallback((pickNumber) => {
    setVisibleCards(picks.map((row, rowI) => row.map((cell, cellI) => {
      const cellNumber = rowI % 2 === 0 ? cellI + 1 : row.length - cellI;
      if (rowI * row.length + cellNumber <= pickNumber) {
        return picks[rowI][cellI];
      }
      return '';
    })));
    setCurrentPickTimer(setTimeout(() => {
      console.log('setting timer for pick number', pickNumber + 1)
      makePick(pickNumber + 1)
    }, pickNumber > 18 ? 30000 : 3000));
  }, [picks]);

  useEffect(() => {
    console.log(currentPickTimer);
    if (!currentPickTimer) {
    console.log('setting initial timer with starting pick of ', startingPick);
      makePick(startingPick);
    }
  }, [makePick, startingPick, currentPickTimer])

  return (
      <Table stickyHeader sx={{maxHeight: '440px'}} aria-label="sticky table">
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
  );
}

DraftTable.propTypes = {
  startingPick: PropTypes.number.isRequired,
  picks: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string
  )).isRequired,
};
