import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import apiInstance from "../../api/apiInstance";

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const res = await apiInstance.post("/todos/.json", todo);
      return { ...todo, id: res.data.name };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getAllTodos = createAsyncThunk(
  "todo/getAllTodos",
  async (_, { rejectWithValue }) => {
    try {
      let res = await apiInstance.get("/todos/.json");
      return Object.keys(res.data).map((key) => ({
        ...res.data[key],
        id: key,
      }));
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      const res = await apiInstance.delete(`/todos/${id}/.json`);
      console.log(res);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (todo, { rejectWithValue }) => {
    try {
      const { id } = todo;
      delete todo.id;
      let res = await apiInstance.patch(`/todos/${id}/.json`, todo);
      return { ...todo, id };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((val) => val.id !== action.payload);
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      const todo = action.payload;
      state.todos = state.todos.map((val) => {
        if (val.id == todo.id) {
          return todo;
        }
        return val;
      });
    });
  },
});

export default todoSlice.reducer;
