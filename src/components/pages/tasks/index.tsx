import { FC, useState } from "react";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import FormDialog from "components/form-dialog";

import useFormDialog from "hooks/useDialog";

import AddIcon from "@mui/icons-material/Add";

const Tasks: FC = () => {
  const [editMode, setEditMode] = useState(false);

  const { open, handleOpen, handleClose } = useFormDialog();

  const onEdit = () => setEditMode(true);
  console.log(onEdit);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Fab aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
        <Typography variant="h5">Add Task</Typography>
      </Box>
      <FormDialog open={open} handleClose={handleClose} editMode={editMode} />
    </>
  );
};

export default Tasks;
