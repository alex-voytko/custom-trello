import { createSlice } from "@reduxjs/toolkit";

const trelloSlice = createSlice({
  name: "boards",
  initialState: {
    items: [],
    selectedTask: {},
  },
  reducers: {
    fetchBoards(state, { payload }) {
      state.items = [...payload];
    },
    addTask(state, { payload }) {
      state.items[0].tasks.push(payload);
    },
    selectTask(state, { payload }) {
      state.items.forEach(board => {
        board.tasks.find(item => {
          if (item.id === payload) {
            item.selected = true;
            state.selectedTask = { ...item };
          }
          return;
        });
      });
    },
  },
});

export const { fetchBoards, addTask, selectTask } = trelloSlice.actions;

export default trelloSlice.reducer;
