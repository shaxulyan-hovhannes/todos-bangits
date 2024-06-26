import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: string;
}

interface TasksState {
  tasks: Task[];
  trash: Task[];
}

const initialState: TasksState = {
  tasks: [],
  trash: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
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
    removeTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        const [removedTask] = state.tasks.splice(index, 1);
        removedTask.status = "removed";
        state.trash.push(removedTask);
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
  markTaskAsComplete,
  markTaskAsOverdue,
} = tasksSlice.actions;
export default tasksSlice.reducer;
