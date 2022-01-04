import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function DraftTable({players, picks}) {
  return (
      <Table stickyHeader sx={{maxHeight: '440px'}} aria-label="sticky table">
        <TableHead>
          <TableRow>
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
          {picks
            .map((row, i) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                {row.map((pick) => (
                  <TableCell key={pick}>
                      {pick}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
  );
}
