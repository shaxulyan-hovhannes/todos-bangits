import { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import styles from "./index.module.scss";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import MUITextField from "components/ui/drawer/text-field/text-field";

import { addTask, Task, editTask } from "store/reducers/tasks";

import { MAIN_THEME_COLOR } from "constants/common";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  editableTask: Task | null;
}

const FormDialog: FC<DialogProps> = ({
  open = false,
  handleClose = () => {},
  editableTask = null,
}) => {
  const dispatch = useDispatch();
  console.log("editableTask", editableTask);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: "",
      status: "pending",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string(),
      deadline: Yup.date().nullable(),
      status: Yup.string()
        .oneOf(["pending", "completed", "overdue", "removed"], "Invalid status")
        .required("Status is required"),
    }),
    onSubmit: (values) => {
      try {
        if (editableTask) {
          dispatch(
            editTask({
              ...values,
              id: editableTask.id,
            })
          );
        } else {
          dispatch(addTask(values));
        }

        console.log("SUBMIT VALUES", values);
        formik.resetForm();
        handleClose();
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        }
      }
    },
  });

  useEffect(() => {
    if (editableTask) {
      formik.setValues({
        title: editableTask.title,
        description: editableTask.description ?? "",
        status: editableTask.status,
        deadline: editableTask.deadline ?? "",
      });
    }
  }, [editableTask]);

  return open ? (
    <Dialog
      open
      PaperProps={{
        component: "form",
        onSubmit: formik.handleSubmit,
      }}
    >
      <DialogTitle>{editableTask ? "Edit Task" : "Create Task"}</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <Box className={styles.fieldWrapper}>
          <MUITextField
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Box>
        <Box className={styles.fieldWrapper}>
          <MUITextField
            multiline
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Box>
        <Box className={styles.fieldWrapper}>
          <MUITextField
            type="date"
            name="deadline"
            value={formik.values.deadline}
            onChange={formik.handleChange}
            error={formik.touched.deadline && Boolean(formik.errors.deadline)}
            helperText={formik.touched.deadline && formik.errors.deadline}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "inherit" }} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: MAIN_THEME_COLOR,
            color: "white",
            "&:hover": { backgroundColor: MAIN_THEME_COLOR, color: "white" },
          }}
          type="submit"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
};

export default FormDialog;
