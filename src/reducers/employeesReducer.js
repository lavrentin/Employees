import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await fetch('https://rocky-temple-83495.herokuapp.com/employees');
  const data = await response.json();
  return data;
});

export const createEmployee = createAsyncThunk('employees/createEmployee', async (employeeData) => {
  const response = await fetch('https://rocky-temple-83495.herokuapp.com/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });
  const data = await response.json();
  return data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (employeeId) => {
  await fetch(`https://rocky-temple-83495.herokuapp.com/employees/${employeeId}`, {
    method: 'DELETE',
  });
  return employeeId;
});

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({ id, employeeData }) => {
  const response = await fetch(`https://rocky-temple-83495.herokuapp.com/employees/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employeeData),
  });
  const data = await response.json();
  return data;
});



const employeesSlice = createSlice({
  name: 'employees',
  initialState: [],
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      return state.filter((employee) => employee.id !== action.payload);
    });
    builder.addCase(editEmployee.fulfilled, (state, action) => {
      const editedEmployee = action.payload;
      const index = state.findIndex((employee) => employee.id === editedEmployee.id);
      if (index !== -1) {
        state[index] = editedEmployee;
      }
    });
  },
});

export default employeesSlice.reducer;
