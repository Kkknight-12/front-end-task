import {
  Box,
  TableCell,
  TableHead,
  TableSortLabel,
  TableRow,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// ----------------------------------------------------------------------

export default function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, visibleRows } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const TABLE_HEAD =
    visibleRows.length > 0
      ? Object.keys(visibleRows[0]).map((key) => ({
          id: key,
          label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
          align: 'right',
        }))
      : [];

  return (
    <TableHead>
      <TableRow>
        {TABLE_HEAD.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align === 'right' ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon={headCell.id !== 'name'}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: 'Titillium Web',
                }}
              >
                {headCell.label}
              </Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
