import { FC, FormEvent } from "react";
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

import { addTask } from "store/reducers/tasks";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  editMode: boolean;
}

const FormDialog: FC<DialogProps> = ({
  open = false,
  handleClose = () => {},
  editMode = false,
}) => {
  const dispatch = useDispatch();

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
        dispatch(addTask(values));
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

  const tasks = useSelector((state) => state);

  console.log("TASKS", tasks);

  return open ? (
    <Dialog
      open
      PaperProps={{
        component: "form",
        onSubmit: formik.handleSubmit,
      }}
    >
      <DialogTitle>{editMode ? "Edit Task" : "Create Task"}</DialogTitle>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  ) : null;
};

export default FormDialog;
