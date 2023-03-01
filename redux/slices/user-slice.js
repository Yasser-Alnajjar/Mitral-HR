import { getRoute } from "@/pages";
import { URL_API } from "@/utils";
import { authHeader } from "@/utils/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

// * Login

export const login = createAsyncThunk(
  "user-slice/login",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${URL_API}/login`, payload);
      const data = await res.data;
      localStorage.setItem("user", JSON.stringify(data));
      if (res.status === 200) {
        thunkAPI.dispatch(toast.success("Login successfully"));
        thunkAPI.dispatch(getRoute("/dashboard"));
      }
      return data;
    } catch (error) {
      error.response && thunkAPI.dispatch(toast.error(error.response.data));
    }
  }
);
// * Logout
export const logout = createAsyncThunk(
  "user-slice/logout",
  async (payload, thunkAPI) => {
    const res = await axios.post(`${URL_API}/logout`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    });
    const data = await res.data;
    thunkAPI.dispatch(toast.success("Logout successfully"));
    localStorage.removeItem("user");
    return data;
  }
);
// * Register
export const registerUser = createAsyncThunk(
  "user-slice/registerUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${URL_API}/register`, payload);
      const data = await res.data;
      return data;
    } catch (error) {
      error.response && thunkAPI.dispatch(toast.error(error.response.data));
    }
  }
);

const userSlice = createSlice({
  name: "user-slice",
  initialState: {
    loading: false,
    user: {},
  },
  reducers: {
    getUserData: (state, action) => {
      state.user = JSON.parse(localStorage.getItem("user"));
    },
  },
  extraReducers: (builder) => {
    // * Login
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.user = action.payload;
      state.loading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.user = action.payload;
      state.loading = true;
    });
    // * Logout
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = true;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.user = {};
      state.loading = false;
    });
    // * Register
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = true;
    });
  },
});

export const { getUserData } = userSlice.actions;

export default userSlice.reducer;
