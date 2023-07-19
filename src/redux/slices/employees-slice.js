import { URL_API } from "../../utils";
import { header } from "../../utils/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addEmployee = createAsyncThunk(
  "employeeSlice/addEmployee",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${URL_API}/employees`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: header,
        },
      });
      const data = await res.data;
      if (res.status === 200)
        thunkAPI.dispatch(toast.success("Add Employee is success"));
      return data;
    } catch (error) {
      thunkAPI.dispatch(toast.error(error.repsonse.data));
    }
  }
);

export const fetchEmployees = createAsyncThunk(
  "employeeSlice/fetchEmployees",
  async () => {
    const res = await axios.get(`${URL_API}/employees`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    });
    const data = await res.data;
    return data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employeeSlice/deleteEmployee",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${URL_API}/employees/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: header,
        },
      });
      const data = await res.data;
      if (res.status === 200)
        thunkAPI.dispatch(toast.success("Employee Is Deleted"));
      return data;
    } catch (error) {
      thunkAPI.dispatch(toast.error(error.repsonse.data));
    }
  }
);

const initialState = {
  loading: false,
  employees: [],
  singleEmployee: [],
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
    builder.addCase(fetchEmployees.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = true;
    });
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
