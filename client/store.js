import { createSlice, configureStore, createSelector } from "@reduxjs/toolkit";

const todos = createSlice({
  name: "todos",
  initialState: {},
  reducer: {
    addTodo: (state, action) => {
      // uses immer under the hood so you can mutate state
      state.todos = [action.payload.todo, state.todos];
    },
    remTodo: (state, { payload }) => {
      const key = payload;
      // remove todo which matches key
      state.splice(state.todos.findIndex(({ key }) => key === todo.key), 1);
    }
  }
});

export const { ...actions } = todos;

export default configureStore({
  reducer: {
    todos: todos.reducer
  }
});
