import { FC, useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import FormDialog from "components/form-dialog";
import MUIDataGrid from "components/ui/table";
import {
  GridColDef,
  GridActionsCellItem,
  GridRowSelectionModel,
  GridRowId,
} from "@mui/x-data-grid";

import useFormDialog from "hooks/useDialog";
import {
  TasksState,
  Task,
  removeTask,
  markTaskAsComplete,
  markTaskAsOverdue,
} from "store/reducers/tasks";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import AddTaskIcon from "@mui/icons-material/AddTask";

const Tasks: FC = () => {
  const [selectedTasks, setSelectedTasks] = useState<GridRowSelectionModel>([]);
  const [editableTask, setEditableTask] = useState<null | Task>(null);

  const dispatch = useDispatch();

  const { open, handleOpen, handleClose } = useFormDialog();

  const tasks: Task[] | unknown = useSelector((state: TasksState) => {
    const tasks = state.tasks;

    if ("tasks" in tasks) {
      return tasks.tasks;
    }
    return [];
  });

  const handleMarkTaskAsComplete = (id: GridRowId) => () => {
    dispatch(markTaskAsComplete(id));
  };

  const handleEditClick = (id: GridRowId) => () => {
    if (Array.isArray(tasks)) {
      const foundTask = tasks.find((task: Task) => task.id === id);

      setEditableTask(foundTask);
    }

    handleOpen();
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    dispatch(removeTask(id));
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
        renderCell: (params) => (
          <span
            style={{
              color:
                params.value === "completed"
                  ? "green"
                  : params.value === "overdue"
                    ? "red"
                    : params.value === "pending"
                      ? "gray"
                      : "black",
            }}
          >
            {params.value}
          </span>
        ),
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

          let foundTask = null;
          if (Array.isArray(tasks)) {
            foundTask = tasks.find((task: Task) => task.id === id);
          }

          if (isSelected) {
            return [
              <GridActionsCellItem
                icon={<AddTaskIcon />}
                label="Complete"
                onClick={handleMarkTaskAsComplete(id)}
                color="inherit"
                title="Complete the task"
                disabled={
                  foundTask.status === "completed" ||
                  foundTask.status === "overdue"
                }
              />,
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={handleEditClick(id)}
                color="inherit"
                title="Edit the task"
                disabled={foundTask.status === "completed"}
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={handleDeleteClick(id)}
                color="inherit"
                title="Delete the task"
              />,
            ];
          }
          return [];
        },
        flex: 1,
      },
    ];
  }, [selectedTasks, tasks, handleDeleteClick, handleEditClick]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Array.isArray(tasks)) {
        const now = new Date();

        tasks.forEach((task) => {
          const taskDeadline = new Date(task.deadline);

          if (now > taskDeadline && task.status !== "completed") {
            dispatch(markTaskAsOverdue(task.id));
          }
        });
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [tasks]);

  return (
    <>
      <h2>Tasks</h2>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Fab size="medium" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <Typography variant="h6">Add Task</Typography>
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
