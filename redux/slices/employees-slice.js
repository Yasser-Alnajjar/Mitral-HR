import { URL_API } from "@/utils";
import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const addEmployee = createAsyncThunk(
  "employeeSlice/addEmployee",
  async (payload) => {
    const res = await axios.post(`${URL_API}/employees`, payload);
    const data = await res.data;
    return data;
  }
);

export const fetchEmployees = createAsyncThunk(
  "employeeSlice/fetchEmployees",
  async () => {
    const res = await axios.get(`${URL_API}/employees`);
    const data = await res.data;
    return data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employeeSlice/deleteEmployee",
  async (id) => {
    const res = await axios.delete(`${URL_API}/employees/${id}`);
    const data = await res.data;
    return data;
  }
);

const initialState = {
  loading: false,
  employees: [],
};
const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // * Add Employee
    builder.addCase(addEmployee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      state.loading = true;
    });
    // * Fetch Employee
    // builder.addCase(fetchEmployees.pending, (state, action) => {
    //   state.loading = true;
    // });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    });
    // builder.addCase(fetchEmployees.rejected, (state, action) => {
    //   state.loading = true;
    // });
    // * delete Employee
    builder.addCase(deleteEmployee.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export const {} = employeeSlice.actions;
export default employeeSlice.reducer;
