import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('https://rocky-temple-83495.herokuapp.com/tasks');
  const data = await response.json();
  return data;
});

export const fetchEmployees = createAsyncThunk('tasks/fetchEmployees', async () => {
  const response = await fetch('https://rocky-temple-83495.herokuapp.com/employees');
  const data = await response.json();
  return data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData) => {
  const response = await fetch('https://rocky-temple-83495.herokuapp.com/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  const data = await response.json();
  return data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await fetch(`https://rocky-temple-83495.herokuapp.com/tasks/${taskId}`, {
    method: 'DELETE',
  });
  return taskId;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, taskData }) => {
  const response = await fetch(`https://rocky-temple-83495.herokuapp.com/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  const data = await response.json();
  return data;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], employees: [], isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
          state.tasks[index] = updatedTask;
        }
      });
  },
});

export const { selectTasks, selectEmployees, selectIsLoading } = tasksSlice.actions;

export default tasksSlice.reducer;
