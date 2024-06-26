import { FC } from "react";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";

const Tasks: FC = () => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Fab aria-label="add" onClick={() => alert("ADD")}>
          <AddIcon />
        </Fab>
        <Typography variant="h5">Add Task</Typography>
      </Box>
    </>
  );
};

export default Tasks;
