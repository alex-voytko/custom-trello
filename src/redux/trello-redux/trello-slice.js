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
      state.items[0].tasks = [...state.items[0].tasks, payload];
    },
    selectTask(state, { payload }) {
      state.selectedTask = { ...payload };
    },
    editTask(state, { payload }) {
      state.items.forEach(board => {
        board.tasks.find(el => {
          if (el.id === payload.id) {
            el.text = payload.text;
          }
        });
      });
    },
    removeTask(state, { payload }) {
      state.items.forEach(board => {
        board.tasks = board.tasks.filter(item => item.id !== payload);
      });
    },
  },
});

export const { fetchBoards, addTask, selectTask, editTask, removeTask } =
  trelloSlice.actions;

export default trelloSlice.reducer;
