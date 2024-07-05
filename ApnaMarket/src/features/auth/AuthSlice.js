import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  loginUser,
  signOut,
  checkAuth,
  restPasswordRequest,
  restPassword,
} from "./AuthAPI";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false,
};

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (useData) => {
    const response = await createUser(useData);
    return response.data;
  }
);
export const resetPasswordRequestAsync = createAsyncThunk(
  "users/resetPasswordRequest",
  async (email, { rejectWithValue }) => {
    try {
      const response = await restPasswordRequest(email);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const resetPasswordAsync = createAsyncThunk(
  "users/restPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await restPassword(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "users/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk(
  "users/checkAuth",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkAuth(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error); // here i can unauthorize the user
      return rejectWithValue(error);
    }
  }
);

export const signOutAsync = createAsyncThunk("users/signOut", async () => {
  const response = await signOut();
  return response.data;
});

export const authSlice = createSlice({
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
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        console.log("loading login user");
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        // console.log("  Kuch dekha yah pe ... " + action.payload);
        // state.error = action.payload;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload; // change the state of error with error message
        state.userChecked = true;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const { increment } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSents = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export const selectResetPasswordRequestStatus = (state) => state.auth.status;

export const selectCount = (state) => state.counter;

export default authSlice.reducer;
