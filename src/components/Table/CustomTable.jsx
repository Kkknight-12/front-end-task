import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPeople,
  searchPeopleByName,
} from '../../features/people/peopleSlice';
import { getComparator, stableSort } from '../../utils/table';
import Loader from '../../widgets/Loader';
import ErrorComponent from '../Error';
import NoData from '../NoData';
import EnhancedTableHead from './TableHead';
import CustomTableRow from './TableRow';

// ----------------------------------------------------------------------

export default function CustomTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [searchName, setSearchName] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [debouncedInputValue, setDebouncedInputValue] = React.useState(null);
  const [tableData, setTableData] = React.useState([]);

  const dispatch = useDispatch();
  const { people, status, count, next, previous, error } = useSelector(
    (state) => state.api
  );
  const isLoading = status === 'loading';

  const handleSearchPeople = (name) => {
    dispatch(searchPeopleByName(name));
  };

  const handleInputChange = (name) => {
    setSearchName(name);
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(searchName);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchName]);

  React.useEffect(() => {
    if (debouncedInputValue === null) {
      dispatch(getPeople());
    }
  }, []);

  React.useEffect(() => {
    setTableData(people);
  }, [people, page]);

  React.useEffect(() => {
    if (debouncedInputValue !== null && debouncedInputValue !== '') {
      handleSearchPeople(debouncedInputValue);
      setPage(0);
    } else if (debouncedInputValue === '') {
      dispatch(getPeople());
    }
  }, [debouncedInputValue]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = tableData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setRowsPerPage(10);
    // setPage(newPage);
    setPage((prevState) => {
      if (prevState < newPage) {
        dispatch(getPeople(next));
      } else {
        dispatch(getPeople(previous));
      }
      return newPage;
    });
    console.log('handleChangePage  newPage', newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const getVisibleRows = (tableData, order, orderBy, page, rowsPerPage) =>
    stableSort(tableData, getComparator(order, orderBy));

  const visibleRows = getVisibleRows(
    tableData,
    order,
    orderBy,
    page,
    rowsPerPage
  );

  return (
    <Box
      sx={{
        width: '100%',
        boxShadow: 3,
        padding: 2,
        mt: 2,
      }}
    >
      {error ? (
        <Box sx={{ height: '50vh' }}>
          <ErrorComponent />
        </Box>
      ) : (
        <>
          <Paper
            sx={{
              width: '100%',
              mb: 2,
              border: 'none',
              boxShadow: 'none',
              position: 'relative',
            }}
          >
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 700,
                fontFamily: 'Titillium Web',
              }}
              variant='h6'
              id='tableTitle'
              component='div'
            >
              Star Wars API
            </Typography>

            <Box
              component='form'
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete='off'
            >
              <TextField
                id='outlined-basic'
                label='Search Name'
                variant='outlined'
                onChange={(event) => handleInputChange(event.target.value)}
              />
            </Box>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby='tableTitle'
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  visibleRows={visibleRows}
                />
                <TableBody>
                  {isLoading ? (
                    <Box sx={{ height: '50vh' }}>
                      <Loader />
                    </Box>
                  ) : visibleRows.length === 0 ? (
                    <Box sx={{ height: '50vh' }}>
                      <NoData />
                    </Box>
                  ) : (
                    visibleRows.map((row, index) => (
                      <CustomTableRow
                        key={row.created}
                        row={row}
                        handleClick={handleClick}
                      />
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component='div'
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label='Dense padding'
          />
        </>
      )}
    </Box>
  );
}
