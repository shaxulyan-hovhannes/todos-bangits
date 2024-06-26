import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GridRowId } from "@mui/x-data-grid";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: string;
}

export interface TasksState {
  tasks: Task[];
  trash: Task[];
}

const initialState: TasksState = {
  tasks: [
    {
      id: "1",
      title: "Title",
      description: "dslfldsj",
      deadline: new Date().toLocaleDateString(),
      status: "pending",
    },
    {
      id: "2",
      title: "Title2",
      description: "dsafk;dskfdslfldsj",
      deadline: new Date().toLocaleDateString(),
      status: "pending",
    },
  ],
  trash: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      console.log("action.payload.deadline", action.payload.deadline);
      const newTask = {
        ...action.payload,
        id: String(Date.now()),
        status: "pending" as const,
      };

      state.tasks.push(newTask);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) state.tasks[index] = action.payload;
    },
    removeTask: (state, action: PayloadAction<GridRowId>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        const [removedTask] = state.tasks.splice(index, 1);
        removedTask.status = "removed";
        state.trash.push(removedTask);
      }
    },
    restoreTask: (state, action: PayloadAction<GridRowId>) => {
      const index = state.trash.findIndex((task) => task.id === action.payload);

      if (index !== -1) {
        const [removedTask] = state.trash.splice(index, 1);
        removedTask.status = "pending";
        state.tasks.push(removedTask);
      }
    },
    markTaskAsComplete: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1 && state.tasks[index].status !== "overdue") {
        state.tasks[index].status = "completed";
      }
    },
    markTaskAsOverdue: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) state.tasks[index].status = "overdue";
    },
  },
});

export const {
  addTask,
  editTask,
  removeTask,
  restoreTask,
  markTaskAsComplete,
  markTaskAsOverdue,
} = tasksSlice.actions;
export default tasksSlice.reducer;
