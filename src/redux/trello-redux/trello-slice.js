import { createSlice } from "@reduxjs/toolkit";

const trelloSlice = createSlice({
  name: "boards",
  initialState: {
    items: [],
  },
  reducers: {
    fetchBoards(state, { payload }) {
      state.items = [...payload];
    },
  },
});

export const { fetchBoards } = trelloSlice.actions;

export default trelloSlice.reducer;
