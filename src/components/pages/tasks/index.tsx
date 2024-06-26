import { FC, useState, useMemo, SetStateAction } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import FormDialog from "components/form-dialog";
import MUIDataGrid from "components/ui/table";
import {
  GridColDef,
  GridActionsCellItem,
  GridRowsProp,
  GridRowSelectionModel,
  GridRowId,
} from "@mui/x-data-grid";

import useFormDialog from "hooks/useDialog";
import { TasksState, Task } from "store/reducers/tasks";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const Tasks: FC = () => {
  const [selectedTasks, setSelectedTasks] = useState<GridRowSelectionModel>([]);
  const [editableTask, setEditableTask] = useState<null | Task>(null);

  const { open, handleOpen, handleClose } = useFormDialog();

  const tasks: Task[] | unknown = useSelector((state: TasksState) => {
    const tasks = state.tasks;

    if ("tasks" in tasks) {
      return tasks.tasks;
    }
    return [];
  });

  const handleEditClick = (id: GridRowId) => () => {
    if (Array.isArray(tasks)) {
      const foundTask = tasks.find((task: Task) => task.id === id);

      setEditableTask(foundTask);
    }

    handleOpen();
  };

  const columns: GridColDef[] = useMemo(() => {
    return [
      { field: "title", headerName: "Title", flex: 1 },
      {
        field: "description",
        headerName: "Description",
        flex: 1,
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
      },
      {
        field: "deadline",
        headerName: "Deadline",
        editable: true,
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        cellClassName: "actions",
        getActions: ({ id }) => {
          const isSelected = selectedTasks.includes(id);

          if (isSelected) {
            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                // onClick={handleDeleteClick(id)}
                color="inherit"
              />,
            ];
          }
          return [];
        },
        flex: 1,
      },
    ];
  }, [selectedTasks, editableTask]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Fab aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <Typography variant="h5">Add Task</Typography>
      </Box>
      <Box sx={{ marginTop: "30px" }}>
        <MUIDataGrid
          columns={columns}
          rows={tasks}
          onRowSelectionModelChange={(selected) => {
            setSelectedTasks(selected);
          }}
          rowSelectionModel={selectedTasks}
        />
      </Box>
      <FormDialog
        open={open}
        handleClose={() => {
          handleClose();
          setEditableTask(null);
        }}
        editableTask={editableTask}
      />
    </>
  );
};

export default Tasks;
