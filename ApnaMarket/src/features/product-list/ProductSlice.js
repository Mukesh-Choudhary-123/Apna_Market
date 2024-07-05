import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductsByFilters,
  fetchCategories,
  fetchBrands,
  fetchProductById,
  createProduct,
  updateProduct,
  fetchBestCategories,
} from "./ProductAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  bestCategories: [],
  status: "idle",
  totalItems: 0,
  selectProduct: null,
};

// export const fetchAllProductsAsync = createAsyncThunk(
//   "product/fetchAllProducts",
//   async () => {
//     const response = await fetchAllProducts();
//     return response.data;
//   }
// );

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, pagination, admin }) => {
    const response = await fetchProductsByFilters(filter, pagination, admin);
    return response.data;
  }
);

export const fetchBestCategoriesAsync = createAsyncThunk(
  "product/fetchBestCategories",
  async (category) => {
    const response = await fetchBestCategories(category);
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/create",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  "product/update",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedproduct: (state) => {
      state.selectProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // .addCase(fetchAllProductsAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.products = action.payload;
      // })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })

      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })

      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBestCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBestCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.bestCategories = action.payload;
      })

      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
        state.selectProduct = action.payload;
      });
  },
});

export const { clearSelectedproduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectProduct;
export const selectProductListStatus = (state) => state.product.status;
export const selectBestCategories = (state) => state.product.bestCategories;
export const selectBestCategoriesStatus = (state) => state.product.status;

export default productSlice.reducer;
