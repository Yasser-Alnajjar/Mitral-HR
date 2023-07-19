import { URL_API } from "../../utils";
import { header } from "../../utils/auth";
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
export const addAttendance = createAsyncThunk(
  "attendanceSlice/addAttendance",
  async (payload) => {
    const res = await axios.post(`${URL_API}/attendance`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    });
    const data = await res.data;
    return data;
  }
);

export const fetchAttendance = createAsyncThunk(
  "attendanceSlice/fetchAttendance",
  async () => {
    const res = await axios.get(`${URL_API}/attendance`, {
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
export const updateAttendance = createAsyncThunk(
  "attendanceSlice/updateAttendance",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${URL_API}/attendance/${payload[0]}`,
        payload[1],
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: header,
          },
        }
      );
      const data = await res.data;
      console.log(data);
      return data;
    } catch (error) {
      thunkAPI.dispatch(toast.error(error.response.data));
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendanceSlice",
  initialState: { loading: false, attendance: [] },
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
    // ? update Attendance
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
