import { URL_API2 } from "@/utils";
import { authHeader } from "@/utils/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { toast } from "react-hot-toast";
// * Login
export const login = createAsyncThunk("user-slice/login", async (payload) => {
  const res = await axios.post(`${URL_API2}/login`, payload);
  const data = await res.data;
  localStorage.setItem("user", JSON.stringify(data.data));
  return data;
});
// * Logout
export const logout = createAsyncThunk("user-slice/logout", async (payload) => {
  const res = await axios.post(`${URL_API2}/logout`, payload);
  const data = await res.data;
  localStorage.removeItem("user");
  return data;
});

const userSlice = createSlice({
  name: "user-slice",
  initialState: {
    loading: false,
    logedin: false,
    user: {
      rate: 5,
      phone: 1121081998,
      salary: 2000,
      address: "giza",
      role: "admin",
      branch: "STO",
      department: "Tecnical",
      email: "yasser@mail.com",
      name: "yasser",
      id: 9,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // * Login
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.logedin = true;
      state.loading = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.user = action.payload;
      state.logedin = false;
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = action.payload;
      state.logedin = false;
      state.loading = true;
    });
    // * Logout
    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = action.payload;
      state.logedin = true;
      state.loading = false;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.user = action.payload;
      state.logedin = false;
      state.loading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.user = action.payload;
      state.logedin = false;
      state.loading = true;
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
