import { URL_API } from "../../utils";
import { header } from "../../utils/auth";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addDepartment = createAsyncThunk(
  "departmentSlice/addDepartment",
  async (payload) => {
    const res = await axios.post(`${URL_API}/departments`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    });
    const data = await res.data;
    return data;
  }
);
export const fetchDepartments = createAsyncThunk(
  "departmentSlice/fetchDepartments",
  async () => {
    const res = await axios.get(`${URL_API}/departments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    });
    const data = await res.data;
    return data;
  }
);

export const deleteDepartment = createAsyncThunk(
  "departmentSlice/deleteDepartment",
  async (id) => {
    const res = await axios.delete(`${URL_API}/departments/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    });
    const data = await res.data;
    return data;
  }
);

export const fetchDepartment_employees = createAsyncThunk(
  "branchSlice/fetchBranch_employees",
  async (id) => {
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
const departmentSlice = createSlice({
  name: "departmentSlice",
  initialState: {
    loading: false,
    departmentes: [],
    department_employee: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    // * Add Department
    builder.addCase(addDepartment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addDepartment.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addDepartment.rejected, (state, action) => {
      state.loading = true;
    });
    // * Fetch Department
    builder.addCase(fetchDepartments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.departmentes = action.payload;
    });
    builder.addCase(fetchDepartments.rejected, (state, action) => {
      state.loading = true;
    });
    // * Fetch Department employees
    builder.addCase(fetchDepartment_employees.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchDepartment_employees.fulfilled, (state, action) => {
      state.loading = false;
      state.department_employee = action.payload;
    });
    builder.addCase(fetchDepartment_employees.rejected, (state, action) => {
      state.loading = true;
    });
    // * delete Department
    builder.addCase(deleteDepartment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteDepartment.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteDepartment.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export const {} = departmentSlice.actions;
export default departmentSlice.reducer;
