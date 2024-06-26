import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
// import { addTask } from "../features/tasks/tasksSlice";
import { TextField, Button } from "@mui/material";

const TaskForm: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string(),
      deadline: Yup.date().nullable(),
    }),
    onSubmit: (values) => {
      //   dispatch(addTask(values));
      formik.resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        fullWidth
        id="description"
        name="description"
        label="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <TextField
        fullWidth
        id="deadline"
        name="deadline"
        label="Deadline"
        type="date"
        value={formik.values.deadline}
        onChange={formik.handleChange}
        error={formik.touched.deadline && Boolean(formik.errors.deadline)}
        helperText={formik.touched.deadline && formik.errors.deadline}
      />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};

export default TaskForm;
