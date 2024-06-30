// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {
//   addToCart,
//   fetchItemByUserId,
//   updateCart,
//   deleteItemFromCart,
//   resetCart,
// } from "./CartAPI";

// const initialState = {
//   status: "idle",
//   cart: [],
//   item: [],
//   cartLoaded: false,
// };

// export const addToCartAsync = createAsyncThunk(
//   "cart/addToCart",
//   async (item) => {
//     const response = await addToCart(item);
//     return response.data;
//   }
// );
// export const fetchItemByUserIdAsync = createAsyncThunk(
//   "cart/fetchItemByUserId",
//   async () => {
//     const response = await fetchItemByUserId();
//     return response.data;
//   }
// );

// export const updateItemAsync = createAsyncThunk(
//   "cart/updateCart",
//   async (update) => {
//     const response = await updateCart(update);
//     console.log(response);
//     return response.data;
//   }
// );
// export const deleteItemFromCartAsync = createAsyncThunk(
//   "cart/deleteItemFromCart",
//   async (itemId) => {
//     const response = await deleteItemFromCart(itemId);
//     return response.data;
//   }
// );

// export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
//   const response = await resetCart();
//   return response.data;
// });

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(addToCartAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addToCartAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         console.log(action.payload);
//         state.item.push(action.payload);
//       })
//       .addCase(fetchItemByUserIdAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         state.item = action.payload;
//         state.cartLoaded = true;
//       })
//       .addCase(fetchItemByUserIdAsync.rejected, (state, action) => {
//         state.status = "idle";
//         state.cartLoaded = true;
//       })
//       .addCase(updateItemAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(updateItemAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         const index = state.item.findIndex(
//           (item) => item.id === action.payload.id
//         );
//         console.log(action.payload);
//         state.item[index] = action.payload;
//       })
//       .addCase(deleteItemFromCartAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         const index = state.item.findIndex(
//           (item) => item.id === action.payload.id
//         );
//         state.item.splice(index, 1);
//       })
//       .addCase(resetCartAsync.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(resetCartAsync.fulfilled, (state, action) => {
//         state.status = "idle";
//         state.item = [];
//       });
//   },
// });

// export const { increment } = cartSlice.actions;

// export const selectItem = (state) => state.cart.item;
// export const selectCartStatus = (state) => state.cart.status;
// export const selectCartLoaded = (state) => state.cart.cartLoaded;

// export default cartSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteItemFromCart,
  fetchItemByUserId,
  resetCart,
  updateCart,
} from "./CartAPI";

const initialState = {
  status: "idle",
  items: [],
  cartLoaded: false,
  error: null,
};

// export const addToCartAsync = createAsyncThunk(
//   "cart/addToCart",
//   async (item) => {
//     const response = await addToCart(item);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item, { rejectWithValue }) => {
    try {
      const response = await addToCart(item);
      return response.data;
    } catch (error) {
      // Capture and return the error message
      return rejectWithValue(
        error.message || "Failed to add to cart cartslices"
      );
    }
  }
);

export const fetchItemByUserIdAsync = createAsyncThunk(
  "cart/fetchItemsByUserId",
  async () => {
    const response = await fetchItemByUserId();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  const response = await resetCart();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
        console.log(" Add to Cart " + state.status);
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

// export const { increment } = cartSlice.actions;

export const selectItem = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
