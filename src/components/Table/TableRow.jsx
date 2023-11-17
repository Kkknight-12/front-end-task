import { TableCell, TableRow, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function CustomTableRow({ row, handleClick }) {
  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.id)}
      role='checkbox'
      tabIndex={-1}
      key={row.created}
      sx={{ cursor: 'pointer' }}
    >
      {Object.entries(row).map(([key, value]) => {
        let specieKind;
        if (key === 'species' && value.length) {
          const [specie] = value;
          let specieNumber = specie.match(/\/(\d+)\/$/)[1];

          switch (specieNumber) {
            case '1':
              specieKind = <i className='fa-solid fa-user fa-lg'></i>;
              break;
            case '2':
              specieKind = <i className='fa-brands fa-android fa-lg'></i>;
              break;
            default:
              specieKind = <i className='fa-solid fa-question fa-lg'></i>;
          }
        }
        return (
          <TableCell key={key} align='right'>
            {Array.isArray(value) ? value.join(', ') : value}
            {specieKind && <span> - {specieKind}</span>}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
