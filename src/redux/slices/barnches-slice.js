import { URL_API } from "../../utils";
import { header } from "../../utils/auth";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
// ? Form Main Branches
export const addBranch = createAsyncThunk(
  "branchSlice/addBranch",
  async (payload) => {
    const res = await axios.post(`${URL_API}/branches`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    });
    const data = await res.data;
    return data;
  }
);

export const fetchRoles = createAsyncThunk(
  "branchSlice/fetchRoles",
  async () => {
    const res = await axios.get(`${URL_API}/roles`);
    const data = await res.data;
    return data;
  }
);
export const fetchBranch = createAsyncThunk(
  "branchSlice/fetchBranch",
  async () => {
    const res = await axios.get(`${URL_API}/branches`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    });
    const data = await res.data;
    // if (data.status === 401) toast.error(data.message);
    return data;
  }
);
export const deleteBranch = createAsyncThunk(
  "branchSlice/deleteBranch",
  async (id) => {
    const res = await axios.delete(`${URL_API}/branches/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    });
    // if (data.status === 401) toast.error(data.message);
    const data = await res.data;
    return data;
  }
);
// ? Form Users in Branches
export const fetchBranch_employees = createAsyncThunk(
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
const branchSlice = createSlice({
  name: "branchSlice",
  initialState: {
    loading: false,
    branches: [],
    branch_employees: [],
    roles: [],
  },

  reducers: {},
  extraReducers: (builder) => {
    // * Add Branch
    builder.addCase(addBranch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addBranch.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addBranch.rejected, (state, action) => {
      state.loading = true;
    });
    // * Fetch Branch
    builder.addCase(fetchBranch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBranch.fulfilled, (state, action) => {
      state.loading = false;
      state.branches = action.payload;
    });
    builder.addCase(fetchBranch.rejected, (state, action) => {
      state.loading = true;
    });
    // * delete Branch
    builder.addCase(deleteBranch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteBranch.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteBranch.rejected, (state, action) => {
      state.loading = true;
    });
    // * fetchBranch_employees
    builder.addCase(fetchBranch_employees.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBranch_employees.fulfilled, (state, action) => {
      state.loading = false;
      state.branch_employees = action.payload;
    });
    builder.addCase(fetchBranch_employees.rejected, (state, action) => {
      state.loading = true;
    });
    // * fetch Roles
    builder.addCase(fetchRoles.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = action.payload;
    });
    builder.addCase(fetchRoles.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export const {} = branchSlice.actions;
export default branchSlice.reducer;
