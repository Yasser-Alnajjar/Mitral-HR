import { URL_API } from "@/utils";
import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const addAttendance = createAsyncThunk(
  "attendanceSlice/addAttendance",
  async (payload) => {
    const res = await axios.post(`${URL_API}/attendance`, payload);
    const data = await res.data;
    return data;
  }
);

export const fetchAttendance = createAsyncThunk(
  "attendanceSlice/fetchAttendance",
  async (payload) => {
    const res = await axios.get(`${URL_API}/attendance`, payload);
    const data = await res.data;
    return data;
  }
);
export const updateAttendance = createAsyncThunk(
  "attendanceSlice/updateAttendance",
  async (payload) => {
    const res = await axios.patch(`${URL_API}/attendance`, payload);
    const data = await res.data;
    return data;
  }
);
export const deleteAttendance = createAsyncThunk(
  "attendanceSlice/deleteAttendance",
  async (id) => {
    const res = await axios.delete(`${URL_API}/attendance/${id}`);
    const data = await res.data;
    return data;
  }
);

const initialState = {
  loading: false,
  attendance: [],
};
const attendanceSlice = createSlice({
  name: "attendanceSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // * Add attendance
    builder.addCase(addAttendance.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addAttendance.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addAttendance.rejected, (state, action) => {
      state.loading = true;
    });
    // * Fetch attendance
    builder.addCase(fetchAttendance.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.attendance = action.payload;
    });
    builder.addCase(fetchAttendance.rejected, (state, action) => {
      state.loading = true;
    });
    // * delete attendance
    builder.addCase(deleteAttendance.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteAttendance.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteAttendance.rejected, (state, action) => {
      state.loading = true;
    });
    // ? update profile
    builder.addCase(updateAttendance.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateAttendance.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(updateAttendance.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export const {} = attendanceSlice.actions;
export default attendanceSlice.reducer;
