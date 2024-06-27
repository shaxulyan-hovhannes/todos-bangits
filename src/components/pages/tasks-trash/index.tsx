import { FC, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';

import MUIDataGrid from 'components/ui/table';

import {
  GridColDef,
  GridActionsCellItem,
  GridRowSelectionModel,
  GridRowId,
} from '@mui/x-data-grid';

import { TasksState, Task, restoreTask } from 'store/reducers/tasks';

import RestorePageIcon from '@mui/icons-material/RestorePage';

const TasksTrash: FC = () => {
  const dispatch = useDispatch();

  const [selectedTasks, setSelectedTasks] = useState<GridRowSelectionModel>([]);

  const tasksTrash: Task[] | unknown = useSelector((state: TasksState) => {
    const tasks = state.tasks;

    if ('trash' in tasks) {
      return tasks.trash;
    }
    return [];
  });

  const handleRestore = (id: GridRowId) => () => {
    dispatch(restoreTask(id));
  };

  const columns: GridColDef[] = useMemo(() => {
    return [
      { field: 'title', headerName: 'Title', flex: 1 },
      {
        field: 'description',
        headerName: 'Description',
        flex: 1,
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        renderCell: (params) => (
          <span
            style={{
              color: 'red',
            }}
          >
            {params.value}
          </span>
        ),
      },
      {
        field: 'deadline',
        headerName: 'Deadline',
        editable: true,
        flex: 1,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isSelected = selectedTasks.includes(id);

          if (isSelected) {
            return [
              <GridActionsCellItem
                icon={<RestorePageIcon />}
                label="Restore"
                onClick={handleRestore(id)}
                color="inherit"
                title="Restore the task"
              />,
            ];
          }
          return [];
        },
        flex: 1,
      },
    ];
  }, [selectedTasks, tasksTrash]);

  return (
    <>
      <h2>Tasks Trash</h2>
      <Box sx={{ marginTop: '30px' }}>
        <MUIDataGrid
          columns={columns}
          rows={tasksTrash}
          onRowSelectionModelChange={(selected) => {
            setSelectedTasks(selected);
          }}
          rowSelectionModel={selectedTasks}
        />
      </Box>
    </>
  );
};

export default TasksTrash;
