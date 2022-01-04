import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function DraftTable({players}) {

        // <TableBody>
        //   {rows
        //     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        //     .map((row) => {
        //       return (
        //         <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        //           {columns.map((column) => {
        //             const value = row[column.id];
        //             return (
        //               <TableCell key={column.id} align={column.align}>
        //                 {column.format && typeof value === 'number'
        //                   ? column.format(value)
        //                   : value}
        //               </TableCell>
        //             );
        //           })}
        //         </TableRow>
        //       );
        //     })}
        // </TableBody>
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
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
      </Table>
    </TableContainer>
  );
}
