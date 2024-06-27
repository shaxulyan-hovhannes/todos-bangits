import { useState, FC } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  GridRowSelectionModel,
} from '@mui/x-data-grid';

interface TableProps {
  columns: GridColDef[];
  rows: any;
  onRowSelectionModelChange?: (
    rowSelectionModel: GridRowSelectionModel,
  ) => void;
  rowSelectionModel?: any;
}

const MUIDataGrid: FC<TableProps> = ({
  columns = [],
  rows = [],
  onRowSelectionModelChange = () => {},
  rowSelectionModel = [],
}) => {
  const handleEditClick = (id: GridRowId) => () => {};

  const handleSaveClick = (id: GridRowId) => () => {};

  const handleDeleteClick = (id: GridRowId) => () => {};

  const handleCancelClick = (id: GridRowId) => () => {};

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter
        checkboxSelection={rows.length > 0}
        isCellEditable={() => false}
        sx={{
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
        }}
        onRowSelectionModelChange={onRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
      />
    </Box>
  );
};

export default MUIDataGrid;
