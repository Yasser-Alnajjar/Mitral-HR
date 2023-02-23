import { URL_API } from "@/utils";
import axios from "axios";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
export const addTask = createAsyncThunk(
  "taskSlice/addTask",
  async (payload) => {
    const res = await axios.post(`${URL_API}/tasks`, payload);
    const data = await res.data;
    return data;
  }
);
export const fetchTasks = createAsyncThunk(
  "taskSlice/fetchTasks",
  async (payload) => {
    const res = await axios.get(`${URL_API}/tasks`, payload);
    const data = await res.data;
    return data;
  }
);
export const deleteTask = createAsyncThunk(
  "taskSlice/deleteTask",
  async (id) => {
    const res = await axios.delete(`${URL_API}/tasks/${id}`);
    const data = await res.data;
    return data;
  }
);
export const updateTask = createAsyncThunk(
  "taskSlice/updateTask",
  async (payload, id) => {
    const res = await axios.patch(`${URL_API}/tasks/${id}`, payload);
    const data = await res.data;
    return data;
  }
);
const taskSlice = createSlice({
  name: "taskSlice",
  initialState: {
    loading: false,
    tasks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    // ? Fetch Tasks
    builder.addCase(fetchTasks.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = true;
    });
    // * Add Task
    builder.addCase(addTask.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.loading = true;
    });
    // ? update Task
    builder.addCase(updateTask.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = true;
    });
    // ! Delete Task
    builder.addCase(deleteTask.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = true;
    });
  },
});
export const {} = taskSlice.actions;
export default taskSlice.reducer;
