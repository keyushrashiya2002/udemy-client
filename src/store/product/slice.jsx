// Import statements for Product function and createAsyncThunk
import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "./thunk";

// Initial state definition
let initialState = {
  loading: false,
  error: null,
  success: null,
  data: [],
  pagination: {},
  filter: {},
};

// Create slice
const slice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    setProductFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetProductFilter: (state) => {
      state.filter = {};
    },
  },
  // Extra reducers to handle async actions
  extraReducers: (builder) => {
    builder

      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error && action.error.message
            ? action.payload || action.payload.message
            : "An error occurred during fetch product";
      });
  },
});

export const { setProductFilter, resetProductFilter } = slice.actions;
export default slice.reducer;
