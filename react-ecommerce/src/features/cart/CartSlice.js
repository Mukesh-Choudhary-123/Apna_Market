import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchItemByUserId,
  updateCart,
  deleteItemFromCart,
} from "./CartAPI";

const initialState = {
  status: "idle",
  // cart: [],
  item: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchItemByUserIdAsync = createAsyncThunk(
  "cart/fetchItemByUserId",
  async (userId) => {
    console.log(userId);
    const response = await fetchItemByUserId(userId);
    return response.data;
  }
);

export const updateItemAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.item.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.item = action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.item.findIndex(
          (item) => item.id === action.payload.id
        );
        state.item[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.item.findIndex(
          (item) => item.id === action.payload.id
        );
        state.item.splice(index, 1);
      });
  },
});

export const { increment } = CartSlice.actions;

export const selectItem = (state) => state.cart.item;

export default CartSlice.reducer;
