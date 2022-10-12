import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TodoListProps } from "redux/types/todoList";
import axios from "axios";

const initialState: TodoListProps = {
  todoList: [],
  showType: 0,
};

export const createToDoList = createAsyncThunk(
  "Create To Do",
  async (title: string) => {
    let data = await axios.post("/api/card/create", {
      title,
      status: "progress",
    });

    return data.data;
  }
);

export const readTodoList = createAsyncThunk("Read To Do", async () => {
  let data = await axios.get("/api/card/readAll");
  return data.data;
});

export const updateTodoList = createAsyncThunk(
  "Update To Do",
  async ({
    id,
    status,
    title = "",
  }: {
    id: number;
    status: string;
    title: string;
  }) => {
    let data = await axios.put("/api/card/update", { id, status, title });
    return data.data;
  }
);

export const deleteTodoList = createAsyncThunk(
  "Delete To Do",
  async (id: number) => {
    let data = await axios.delete(`/api/card/delete/${id}`);
    return data.data;
  }
);

export const TodoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    setShowType: (state, action: PayloadAction<any>) => {
      const showType = action.payload;
      state.showType = showType;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      createToDoList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.todoList = action.payload;
        return state;
      }
    );

    builder.addCase(
      readTodoList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.todoList = action.payload;
        return state;
      }
    );

    builder.addCase(
      updateTodoList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.todoList = action.payload;
        return state;
      }
    );

    builder.addCase(
      deleteTodoList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.todoList = action.payload;
        return state;
      }
    );
  },
});

export const { setShowType } = TodoListSlice.actions;
export default TodoListSlice.reducer;
