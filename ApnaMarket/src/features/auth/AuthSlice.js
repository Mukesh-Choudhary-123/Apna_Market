import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser } from "./AuthAPI";
import { updateUser } from "../user/UserAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (useData) => {
    const response = await createUser(useData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "users/checkUser",
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "users/updateUser",
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export const { increment } = counterSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export const selectCount = (state) => state.counter;

export default counterSlice.reducer;
