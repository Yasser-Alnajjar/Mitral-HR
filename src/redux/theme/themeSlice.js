const { createSlice } = require("@reduxjs/toolkit");

const themeSlice = createSlice({
  name: "theme",
  initialState: { open: false, mode: false },
  reducers: {
    openSidebar: (state, action) => {
      state.open = action.payload;
    },
  },
});
export const { openSidebar } = themeSlice.actions;
export default themeSlice.reducer;
export const selectOpen = (state) => state.theme.open;
