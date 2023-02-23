import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: "dark",
    sidbar: false,
  },
  reducers: {
    setDarkTheme(state) {
      state.mode = "dark";
      localStorage.setItem("theme", "dark");
    },
    setDefaultTheme(state) {
      state.mode = "light";
      localStorage.setItem("theme", "light");
    },

    showSidbar(state, action) {
      state.sidbar = action.payload;
    },
  },
});

export const { showSidbar, setDarkTheme, setDefaultTheme } = themeSlice.actions;

export default themeSlice.reducer;
