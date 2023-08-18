import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      console.log("user", user);
      console.log("accessToken", accessToken);
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("token");
      }
    },
  },
});
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
