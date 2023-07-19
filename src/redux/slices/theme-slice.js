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
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    },
    setDefaultTheme(state) {
      state.mode = "light";
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    },

    showSidbar(state, action) {
      state.sidbar = action.payload;
    },
  },
});

export const { showSidbar, setDarkTheme, setDefaultTheme } = themeSlice.actions;

export default themeSlice.reducer;
