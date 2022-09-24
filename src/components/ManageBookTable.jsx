import { MenuItem, Select, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { format } from 'date-fns';
import * as React from 'react';

function createMissedBookData(
  title,
  period,
  payed,
  checkOutNumber,
  checkOutDate,
  returnedDate,
  deadline,
) {
  return {
    title,
    period,
    payed,
    checkOutNumber,
    checkOutDate,
    returnedDate,
    deadline,
  };
}
function createCheckOutBookData(
  title,
  checkOutNumber,
  checkOutDate,
  returnedDate,
  deadline,
) {
  return { title, checkOutNumber, checkOutDate, returnedDate, deadline };
}

const ManageBookTable = ({ member, sx, ...props }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectInput, setSelectInput] = React.useState('missed');

  const checkOuts = member.check_out_members;
  let missedCheckOuts = [];
  let previousCheckOuts = [];

  if (checkOuts) {
    checkOuts.forEach((checkOut) => {
      if (checkOut.missed_book) {
        missedCheckOuts.push(checkOut);
      }
      if (checkOut.returned_date) {
        previousCheckOuts.push(checkOut);
      }
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns =
    selectInput === 'missed'
      ? [
          {
            id: 'title',
            label: 'Title',
            minWidth: '200px',
            format: (val) => val.toString(),
          },
          {
            id: 'period',
            label: 'Period',
            minWidth: 'min-content',
            format: (val) => val.toString(),
          },
          {
            id: 'payed',
            label: 'Payed',
            minWidth: 'min-content',
            format: (val) => {
              return (
                <Typography
                  component="span"
                  color={val ? 'secondary' : 'error'}
                >
                  {val.toString()}
                </Typography>
              );
            },
          },
          {
            id: 'checkOutNumber',
            label: 'Check Out Number',
            minWidth: '150px',
            format: (val) => val.toString(),
          },
          {
            id: 'checkOutDate',
            label: 'Check Out Date',
            minWidth: '150px',
            format: (val) => format(new Date(val), 'dd-MM-yyyy'),
          },
          {
            id: 'returnedDate',
            label: 'Returned Date',
            minWidth: '150px',
            format: (val) => format(new Date(val), 'dd-MM-yyyy'),
          },
          {
            id: 'deadline',
            label: 'Deadline',
            minWidth: '150px',
            format: (val) => format(new Date(val), 'dd-MM-yyyy'),
          },
        ]
      : [
          {
            id: 'title',
            label: 'Title',
            minWidth: 'min-content',
            format: (val) => val.toString(),
          },
          {
            id: 'checkOutNumber',
            label: 'Check Out Number',
            minWidth: 'min-content',
            format: (val) => val.toString(),
          },
          {
            id: 'checkOutDate',
            label: 'Check Out Date',
            minWidth: 'min-content',
            format: (val) => format(new Date(val), 'dd-MM-yyyy'),
          },
          {
            id: 'returnedDate',
            label: 'Returned Date',
            minWidth: 'min-content',
            format: (val) => format(new Date(val), 'dd-MM-yyyy'),
          },
          {
            id: 'deadline',
            label: 'Deadline',
            minWidth: 'min-content',
            format: (val) => format(new Date(val), 'dd-MM-yyyy'),
          },
        ];

  const rows =
    selectInput === 'missed'
      ? missedCheckOuts.map((checkOut) => {
          const book = checkOut.check_out_books;
          const missedBook = checkOut.missed_book;

          return createMissedBookData(
            book.title,
            missedBook.period,
            missedBook.payed,
            checkOut.check_out_num,
            checkOut.check_out_date,
            checkOut.returned_date,
            checkOut.deadline,
          );
        })
      : previousCheckOuts.map((checkOut) => {
          const book = checkOut.check_out_books;

          return createCheckOutBookData(
            book.title,
            checkOut.check_out_num,
            checkOut.check_out_date,
            checkOut.returned_date,
            checkOut.deadline,
          );
        });

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'rgba(0, 0, 0, 0.05)',
        p: '20px',
        borderRadius: '3px',
        ...sx,
      }}
      {...props}
    >
      <Stack width="100%" direction="row" gap="10px" py="10px">
        <Select
          variant="outlined"
          size="small"
          value={selectInput}
          color="secondary"
          onChange={(e) => {
            setSelectInput(e.target.value);
          }}
          sx={{
            backgroundColor: 'white',
          }}
        >
          <MenuItem value="missed">Missed Deadlines</MenuItem>
          <MenuItem value="previous">Previous Books</MenuItem>
        </Select>
      </Stack>
      <TableContainer
        sx={{ maxHeight: 'calc( 100vh - 150px )', bgcolor: 'white' }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead color="rgba(0, 0, 0, 0.1)">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover key={`${row.title} ${index}`}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id}>
                          {value === undefined || value === null
                            ? '-- none --'
                            : column.format
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ bgcolor: 'white' }}
      />
    </Paper>
  );
};

export default ManageBookTable;
